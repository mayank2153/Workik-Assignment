const verifyGitHubSignature = (req, res, next) => {
    const payload = JSON.stringify(req.body);
    const signature = `sha256=${crypto
      .createHmac('sha256', 'your-webhook-secret') 
      .update(payload)
      .digest('hex')}`;
  
    if (req.headers['x-hub-signature-256'] !== signature) {
      return res.status(401).send('Signature mismatch!');
    }
    next();
  };
  export default verifyGitHubSignature
  