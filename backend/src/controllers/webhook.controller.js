import fetchPRDiff from "../config/getDiffData.js";

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
      const id = prData?.head?.repo?.owner?.id || prData?.user?.id; 
      
      console.log('New pull request opened:', { title, diffUrl });

      // Fetching the diff
      if (!diffUrl || !id) {
        console.error('Missing diffUrl or repository owner id');
        return res.status(400).send('Missing diff URL or repository owner ID');
      }
      
      const diff = await fetchPRDiff(diffUrl, id);
      
      // If fetching diff fails
      if (!diff) {
        console.error('Error fetching diff data');
        return res.status(500).send('Failed to fetch diff data');
      }
      
      // Call your AI model here to review the PR
      const reviewComment = await generateAIReview(title, body, diff);
      
      // Post a review comment on the PR (assuming postReviewComment function exists)
      // await postReviewComment(prData, reviewComment);
      
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

export { createReview };
