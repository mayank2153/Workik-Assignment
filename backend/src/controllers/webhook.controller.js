const createReview=async(req,res)=>{
    const event = req.headers['x-github-event'];

    if (event === 'pull_request') {
    const prData = req.body.pull_request;
    console.log('New pull request opened:', prData);

    // // Call your AI model here to review the PR
    // const reviewComment = await generateAIReview(prData);

    // // Post a review comment on the PR
    // await postReviewComment(prData, reviewComment);
  }

  res.status(200).send('Webhook received');
}
export {createReview};