import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();
const generateAIReview = async (prData) => {
    const genAI = new GoogleGenerativeAI("AIzaSyDlgai7qDnsYyYtk-0tJexOCxSh1Nhl55g");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
    You are reviewing a pull request titled "Create README.md". The description of the PR is: "hey this is readme". 
    Below are the code changes (diff):
        diff --git a/README.md b/README.md
        new file mode 100644
        index 0000000..6b6dd6b
        --- /dev/null
        +++ b/README.md
        @@ -0,0 +1 @@
        +this is temp readme

    Your task is to:
        1. Analyze the code changes.
        2. Ensure the changes align with the title and description of the PR.
        3. Provide feedback on code quality, best practices, and structure.
        4. Suggest improvements or point out issues if necessary.

    Provide a detailed review based on these criteria.
    `;
    
    try {
        const result = await model.generateContent([prompt]);
        
        console.log(result.response.text());
        
    } catch (error) {
        console.error("Error generating AI review:", error);
    }
};
const testPRData = ` 
    New pull request opened: {

  url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls/3';,

  id: 2116936419,

  node_id: 'PR_kwDOI38SLc5-LeLj',

  html_url: 'https://github.com/mayank2153/binary-search-assignment/pull/3';,

  diff_url: 'https://github.com/mayank2153/binary-search-assignment/pull/3.diff';,

  patch_url: 'https://github.com/mayank2153/binary-search-assignment/pull/3.patch';,

  issue_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues/3';,

  number: 3,

  state: 'open',

  locked: false,

  title: 'Create README.md',

  user: {

    login: 'mayank2153',

    id: 114002151,

    node_id: 'U_kgDOBsuI5w',

    avatar_url: 'https://avatars.githubusercontent.com/u/114002151?v=4';,

    gravatar_id: '',

    url: 'https://api.github.com/users/mayank2153';,

    html_url: 'https://github.com/mayank2153';,

    followers_url: 'https://api.github.com/users/mayank2153/followers';,

    following_url: 'https://api.github.com/users/mayank2153/following{/other_user}',

    gists_url: 'https://api.github.com/users/mayank2153/gists{/gist_id}',

    starred_url: 'https://api.github.com/users/mayank2153/starred{/owner}{/repo}',

    subscriptions_url: 'https://api.github.com/users/mayank2153/subscriptions';,

    organizations_url: 'https://api.github.com/users/mayank2153/orgs';,

    repos_url: 'https://api.github.com/users/mayank2153/repos';,

    events_url: 'https://api.github.com/users/mayank2153/events{/privacy}',

    received_events_url: 'https://api.github.com/users/mayank2153/received_events';,

    type: 'User',

    site_admin: false

  },

  body: 'hey this is readme',

  created_at: '2024-10-10T07:52:38Z',

  updated_at: '2024-10-10T07:52:38Z',

  closed_at: null,

  merged_at: null,

  merge_commit_sha: null,

  assignee: null,

  assignees: [],

  requested_reviewers: [],

  requested_teams: [],

  labels: [],

  milestone: null,

  draft: false,

  commits_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls/3/commits';,

  review_comments_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls/3/comments';,

  review_comment_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls/comments{/number}',

      hooks_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/hooks';,

      issue_events_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues/events{/number}',

      events_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/events';,

      assignees_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/assignees{/user}',

      branches_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/branches{/branch}',

      tags_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/tags';,

      blobs_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/blobs{/sha}',

      git_tags_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/tags{/sha}',

      git_refs_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/refs{/sha}',

      trees_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/trees{/sha}',

      statuses_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/statuses/{sha}',

      languages_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/languages';,

      stargazers_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/stargazers';,

      contributors_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/contributors';,

      subscribers_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/subscribers';,

      subscription_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/subscription';,

      commits_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/commits{/sha}',

      git_commits_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/commits{/sha}',

      comments_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/comments{/number}',

        contents_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/contents/{+path}',

      compare_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/compare/{base}...{head}',

      merges_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/merges';,

      archive_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/{archive_format}{/ref}',

      downloads_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/downloads';,

      issues_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues{/number}',

      pulls_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls{/number}',

      milestones_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/milestones{/number}',

      notifications_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/notifications{?since,all,participating}',

      labels_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/labels{/name}',

      releases_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/releases{/id}',

      deployments_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/deployments';,

      created_at: '2023-01-31T09:18:07Z',

      updated_at: '2023-01-31T09:18:55Z',

      pushed_at: '2024-10-10T07:52:27Z',

      git_url: 'git://github.com/mayank2153/binary-search-assignment.git',

      ssh_url: 'git@github.com:mayank2153/binary-search-assignment.git',

      clone_url: 'https://github.com/mayank2153/binary-search-assignment.git';,

      svn_url: 'https://github.com/mayank2153/binary-search-assignment';,

      homepage: null,

      size: 7,

      stargazers_count: 0,

      watchers_count: 0,

      language: 'C++',

      has_issues: true,

      has_projects: true,

      has_downloads: true,

      has_wiki: true,

      has_pages: false,

      has_discussions: false,

      forks_count: 0,

      mirror_url: null,

      archived: false,

      disabled: false,

      open_issues_count: 3,

      license: null,

      allow_forking: true,

      is_template: false,

      web_commit_signoff_required: false,

      topics: [],

      visibility: 'public',

      forks: 0,

      open_issues: 3,

      watchers: 0,

      default_branch: 'main',

      allow_squash_merge: true,

      allow_merge_commit: true,

      allow_rebase_merge: true,

      allow_auto_merge: false,

      delete_branch_on_merge: false,

      allow_update_branch: false,

      use_squash_pr_title_as_default: false,

      squash_merge_commit_message: 'COMMIT_MESSAGES',

      squash_merge_commit_title: 'COMMIT_OR_PR_TITLE',

      merge_commit_message: 'PR_TITLE',

      merge_commit_title: 'MERGE_MESSAGE'

    }

  },

  base: {

    label: 'mayank2153:main',

    ref: 'main',

    sha: '5c17e1342226f0543378e7ab5ac95f80b352c143',

    user: {

      login: 'mayank2153',

      id: 114002151,

      node_id: 'U_kgDOBsuI5w',

      avatar_url: 'https://avatars.githubusercontent.com/u/114002151?v=4';,

      gravatar_id: '',

      url: 'https://api.github.com/users/mayank2153';,

      html_url: 'https://github.com/mayank2153';,

      followers_url: 'https://api.github.com/users/mayank2153
      following_url: 'https://api.github.com/users/mayank2153/following{/other_user}',

      gists_url: 'https://api.github.com/users/mayank2153/gists{/gist_id}',

      starred_url: 'https://api.github.com/users/mayank2153/starred{/owner}{/repo}',

      subscriptions_url: 'https://api.github.com/users/mayank2153/subscriptions';,

      organizations_url: 'https://api.github.com/users/mayank2153/orgs';,

      repos_url: 'https://api.github.com/users/mayank2153/repos';,

      events_url: 'https://api.github.com/users/mayank2153/events{/privacy}',

      received_events_url: 'https://api.github.com/users/mayank2153/received_events';,

      type: 'User',

      site_admin: false

    },

    repo: {

      id: 595530285,

      node_id: 'R_kgDOI38SLQ',

      name: 'binary-search-assignment',

      full_name: 'mayank2153/binary-search-assignment',

      private: false,

      owner: [Object],

      html_url: 'https://github.com/mayank2153/binary-search-assignment';,

      description: null,

      fork: false,

      url: 'https://api.github.com/repos/mayank2153/binary-search-assignment';,

      forks_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/forks';,

      keys_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/keys{/key_id}',

      collaborators_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/collaborators{/collaborator}',

      teams_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/teams';,

      hooks_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/hooks';,

      issue_events_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues/events{/number}',

      events_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/events';,

      assignees_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/assignees{/user}',

      branches_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/branches{/branch}',

      tags_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/tags';,

      blobs_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/blobs{/sha}',

      git_tags_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/tags{/sha}',

      git_refs_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/refs{/sha}',

      trees_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/trees{/sha}',

      statuses_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/statuses/{sha}',

      languages_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/languages';,

      stargazers_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/stargazers';,

      contributors_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/contributors';,

      subscribers_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/subscribers';,

      subscription_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/subscription';,

      commits_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/commits{/sha}',

      git_commits_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/git/commits{/sha}',

      comments_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/comments{/number}',

      issue_comment_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues/comments{/number}',

      contents_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/contents/{+path}',

      compare_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/compare/{base}...{head}',

      merges_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/merges';,

      archive_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/{archive_format}{/ref}',

      downloads_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/downloads';,

      issues_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues{/number}',

      pulls_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls{/number}',

      milestones_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/milestones{/number}',

      notifications_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/notifications{?since,all,participating}',

      labels_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/labels{/name}',

      releases_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/releases{/id}',

      deployments_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/deployments';,

      created_at: '2023-01-31T09:18:07Z',

      updated_at: '2023-01-31T09:18:55Z',

      pushed_at: '2024-10-10T07:52:27Z',

      git_url: 'git://github.com/mayank2153/binary-search-assignment.git',

      ssh_url: 'git@github.com:mayank2153/binary-search-assignment.git',

      clone_url: 'https://github.com/mayank2153/binary-search-assignment.git';,

      svn_url: 'https://github.com/mayank2153/binary-search-assignment';,

      homepage: null,

      size: 7,

      stargazers_count: 0,

      watchers_count: 0,

      language: 'C++',

      has_issues: true,

      has_projects: true,

      has_downloads: true,

      has_wiki: true,

      has_pages: false,

      has_discussions: false,

      forks_count: 0,

      mirror_url: null,

      archived: false,

      disabled: false,

      open_issues_count: 3,

      license: null,

      allow_forking: true,

      is_template: false,
      web_commit_signoff_required: false,

      topics: [],

      visibility: 'public',

      forks: 0,

      open_issues: 3,

      watchers: 0,

      default_branch: 'main',

      allow_squash_merge: true,

      allow_merge_commit: true,

      allow_rebase_merge: true,

      allow_auto_merge: false,

      delete_branch_on_merge: false,

      allow_update_branch: false,

      use_squash_pr_title_as_default: false,

      squash_merge_commit_message: 'COMMIT_MESSAGES',

      squash_merge_commit_title: 'COMMIT_OR_PR_TITLE',

      merge_commit_message: 'PR_TITLE',

      merge_commit_title: 'MERGE_MESSAGE'

    }

  },

  _links: {

    self: {

      href: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls/3';

    },

    html: {

      href: 'https://github.com/mayank2153/binary-search-assignment/pull/3';

    },

    issue: {

      href: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues/3';

    },

    comments: {

      href: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues/3/comments';

    },

    review_comments: {

      href: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls/3/comments';

    },

    review_comment: {

      href: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls/comments{/number}'

    },

    commits: {

      href: 'https://api.github.com/repos/mayank2153/binary-search-assignment/pulls/3/commits';

    },

  comments_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/issues/3/comments';,

    statuses: {

      href: 'https://api.github.com/repos/mayank2153/binary-search-assignment/statuses/265ed3b84b32ad73994a5c40529bf1e8101524e6';

    }

  statuses_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/statuses/265ed3b84b32ad73994a5c40529bf1e8101524e6';,

  },

  author_association: 'OWNER',

  head: {

  auto_merge: null,

    label: 'mayank2153:mayank2153-patch-4',

  active_lock_reason: null,

  merged: false,

    ref: 'mayank2153-patch-4',

  mergeable: null,

    sha: '265ed3b84b32ad73994a5c40529bf1e8101524e6',

  rebaseable: null,

    user: {

  mergeable_state: 'unknown',

      login: 'mayank2153',

  merged_by: null,

      id: 114002151,

  comments: 0,

      node_id: 'U_kgDOBsuI5w',

  review_comments: 0,

  maintainer_can_modify: false,

      avatar_url: 'https://avatars.githubusercontent.com/u/114002151?v=4';,

  commits: 1,

      gravatar_id: '',

  additions: 1,

  deletions: 0,

      url: 'https://api.github.com/users/mayank2153';,

  changed_files: 1

      html_url: 'https://github.com/mayank2153';,

}followers_url: 'https://api.github.com/users/mayank2153/followers';,

      following_url: 'https://api.github.com/users/mayank2153/following{/other_user}',

      gists_url: 'https://api.github.com/users/mayank2153/gists{/gist_id}',

      starred_url: 'https://api.github.com/users/mayank2153/starred{/owner}{/repo}',

      subscriptions_url: 'https://api.github.com/users/mayank2153/subscriptions';,

      organizations_url: 'https://api.github.com/users/mayank2153/orgs';,

      repos_url: 'https://api.github.com/users/mayank2153/repos';,

      events_url: 'https://api.github.com/users/mayank2153/events{/privacy}',

      received_events_url: 'https://api.github.com/users/mayank2153/received_events';,

      type: 'User',

      site_admin: false

    },

    repo: {

      id: 595530285,

      node_id: 'R_kgDOI38SLQ',

      name: 'binary-search-assignment',

      full_name: 'mayank2153/binary-search-assignment',

      private: false,

      owner: [Object],

      html_url: 'https://github.com/mayank2153/binary-search-assignment';,

      description: null,

      fork: false,

      url: 'https://api.github.com/repos/mayank2153/binary-search-assignment';,

      forks_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/forks';,

      keys_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/keys{/key_id}',

      collaborators_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/collaborators{/collaborator}',

      teams_url: 'https://api.github.com/repos/mayank2153/binary-search-assignment/teams';,
`;



generateAIReview(testPRData).then(() => console.log("Test Completed!"));




