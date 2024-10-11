import fetchPRDiff from "../config/getDiffData.js";
import generateAIReview from "../config/generateAIReview.js";
import { Octokit } from "@octokit/core";
import { User } from "../models/user.model.js";
const createReview = async (req, res) => {
  try {
    const event = req.headers['x-github-event'];
    console.log("Webhook started");

    // Proceed only if the event is a pull request
    if (event === 'pull_request') {
      const prData = req.body?.pull_request;
      
      if (!prData) {
        console.error('No pull request data found');
        return res.status(400).send('Invalid pull request data');
      }

      const title = prData?.title || 'No title';
      const body = prData?.body || 'No body';
      const diffUrl = prData?.diff_url;
      const id = prData?.base?.repo?.owner?.id || prData?.user?.id; 
      const repoOwner = prData?.base?.repo?.owner?.login;
      const repoName = prData?.base?.repo?.name;
      const prNumber = prData?.number;
      const user = await User.findOne({githubId:id});
      if(!user){
          throw new Error("User not found")
      }
      const token = user?.accessToken;
      console.log('New pull request opened:', { title, diffUrl });

      // Fetching the diff
      if (!diffUrl) {
        console.error('Missing diffUrl');
        return res.status(400).send('Missing diff URL');
      }
      
      const diff = await fetchPRDiff(diffUrl, token);
      
      // If fetching diff fails
      if (!diff) {
        console.error('Error fetching diff data');
        return res.status(500).send('Failed to fetch diff data');
      }
      
      // Call your AI model here to review the PR
      const reviewComment = await generateAIReview(title, body, diff);

      // Post a review comment on the PR using GitHub API
      await postReviewComment(repoOwner, repoName, prNumber, reviewComment,token);

      res.status(200).send('Review created successfully');
    } else {
      // If it's not a pull_request event, acknowledge it.
      res.status(200).send('Event not handled');
    }

  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Internal server error');
  }
};

// Function to post review comment
const postReviewComment = async (owner, repo, pull_number, comment,token) => {
  const octokit = new Octokit({
    auth: token 
  });

  try {
    await octokit.request('POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
      owner,
      repo,
      pull_number,
      body: comment,
      event: 'COMMENT', 
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log('Review posted successfully');
  } catch (error) {
    console.error('Error posting review:', error.response.data);
    throw error;
  }
};

export { createReview };
