import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function GitHubRepos() {
  const { userId } = useParams();
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_BASE_URL || 'http://localhost:4000/';
  const validateToken = async (token) => {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Token is valid. User:", response.data.login);
      console.log("Token scopes:", response.headers['x-oauth-scopes']);
      return true;
    } catch (error) {
      console.error("Token validation failed:", error.response ? error.response.data : error.message);
      return false;
    }
  };
  const createWebhook = async (owner, repo) => {
    console.log("owner and repo name:", owner, repo);
  
    try {
      const PAT=import.meta.env.VITE_GITHUB_PAT;
      const accessToken = PAT;

      if (!accessToken) {
        console.error("Missing access token for creating webhook.");
        return; // Exit function early if no token
      }
      await validateToken(accessToken)
  
      console.log("Constructed URL:", `https://api.github.com/repos/${owner}/${repo}/hooks`);
      console.log("Authorization header:", `Bearer ${accessToken}`);
      console.log("Webhook data:", {
        name: 'web',
        active: true,
        events: ['pull_request'],
        config: {
          url: `${url}hook/webhook`,
          content_type: 'json',
          secret: 'your-webhook-secret',
        },
      });
  
      const response = await axios.post(
        `https://api.github.com/repos/${owner}/${repo}/hooks`,
        {
          name: 'web',
          active: true,
          events: ['pull_request'],
          config: {
            url: `${url}hook/webhook`,
            content_type: 'json',
            secret: 'your-webhook-secret',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${PAT}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
  
      console.log("API response:", response); 
  
      alert('Webhook created successfully!');
    }
    catch (error) {
      console.error("Error creating webhook:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
        
        if (error.response.status === 404) {
          console.error("Repository not found or user doesn't have access");
        } else if (error.response.status === 401) {
          console.error("Unauthorized: Token may be invalid or expired");
        } else if (error.response.status === 403) {
          console.error("Forbidden: User may not have necessary permissions");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      alert(`Error creating webhook: ${error.message}`);
    }    
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`${url}users/user/${userId}`, {
          withCredentials: true,
        });
        setUser(userResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching user data');
      }
    };

    fetchUser();
  }, [userId, url]);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!user) return;
      try {
        const token = user?.data?.accessToken;
        const userName = user?.data?.username;
        const reposResponse = await axios.get(`https://api.github.com/users/${userName}/repos`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        setRepos(reposResponse.data);
        console.log("repo data",repos)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching repos');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-red-500 text-xl bg-white p-4 rounded-lg shadow">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      {user && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{user.name}'s Repositories</h1>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 text-gray-600 font-semibold">Repository</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Language</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.id} className="border-t border-gray-100">
                <td className="px-4 py-2">
                  <div className="font-medium text-gray-900">{repo.name}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-sm text-gray-500">{repo.language || 'Not specified'}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors duration-150"
                    >
                      View
                    </a>
                    <button
                      onClick={() => createWebhook(repo.owner.login, repo.name)}
                      className="text-green-500 hover:text-green-600 transition-colors duration-150"
                    >
                      Create Webhook
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}