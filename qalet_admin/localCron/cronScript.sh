qaletFolderMaster="/var/qalet/master"
qaletFolderAdmin="/var/qalet/admin"
qaletFolderProxy="/var/qalet/proxy"
qaletFolderSites="/var/qalet/sites"
qaletFolderSetup="/var/qalet/master/setup"
qaletFolderTasks="/var/qalet/tasks"

mkdir -p $qaletFolderMaster && mkdir -p $qaletFolderSites
mkdir -p $qaletFolderTasks && mkdir -p $qaletFolderAdmin && mkdir -p $qaletFolderSetup

mkdir -p "$qaletFolderSetup/log"
# cd $qaletFolderSetup && git pull

# cp -rf "$qaletFolderSetup/qalet_admin/." "$qaletFolderAdmin/" && rm -fr "$qaletFolderAdmin/Dockerfile"
# cp -rf "$qaletFolderSetup/docker-httpd-reverseproxy/." "$qaletFolderProxy/" && rm -fr "$qaletFolderProxy/Dockerfile"

mkdir -p /var/qalet/log/
node /var/qalet/admin/localCron/masterUpdate.js >> /var/qalet/log/codeUpdate.js.log
node /var/qalet/admin/localCron/siteUpdate.js >> /var/qalet/log/codeUpdate.js.log
