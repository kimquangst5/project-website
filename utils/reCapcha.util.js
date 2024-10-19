const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const storage = google.storage('v1');

module.exports = async () => {
	const auth = new GoogleAuth({
		scopes: 'https://www.googleapis.com/auth/cloud-platform',
		projectId: 'project-backend-quangtk2005',
	});
	// const client = await auth.getClient();
	const authClient = await auth.getClient();
	google.options({
		auth: authClient
	});
	const projectId = await auth.getProjectId();
	const res = await storage.buckets.list({
		project: projectId
	});
}