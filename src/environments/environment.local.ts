export const environment = {
  production: false,
  apiUrl: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/stf-msa-staffing/',
  apiUrlReport: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/stf-msa-reports/',
  authProvider: {
    accessTokenName: 'access_token',
    authToken: 'auth_token',
    scopes: ["openid https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/stf-msa-staffing"],
    clientId: '10f215a8-516a-49ca-8eb3-dc3fc22412d7',
    tenantId: 'f5b0d682-1497-4db0-9019-660035554e72',
    redirectUrl: '/',
    authority: 'https://login.microsoftonline.com/f5b0d682-1497-4db0-9019-660035554e72'
  },
  storage: {
    key: '<6aR!DZj5)'
  },
};
