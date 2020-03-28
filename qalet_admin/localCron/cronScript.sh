mkdir -p /var/qalet/log/
node /var/qalet/admin/localCron/masterUpdate.js >> /var/qalet/log/codeUpdate.js.log
node /var/qalet/admin/localCron/siteUpdate.js >> /var/qalet/log/codeUpdate.js.log
