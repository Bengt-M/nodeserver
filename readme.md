# About

This web server has two interfaces:

- An Arduino based sensor can post data readings
- A react app can get all stored readings

The readings are stored in a json file.

## Install

```sh
# as root

cd /opt
rm -rf nodeserver
git clone https://github.com/Bengt-M/nodeserver.git
cd nodeserver
rm -rf .git # optional
rm -rf .gitignore
npm install
chown -R apache:apache .
restorecon -R -v .
```

```sh
# as root

cd /opt
rm -rf nodeserver
cp -R /home/bengt/node-react-workspace/nodeserver .
cd nodeserver
rm -rf .git # optional
npm install
chown -R apache:apache .
restorecon -R -v .
```

## Setup as a systemd service

file: /etc/systemd/system/node-temp-server.service

```sh
[Unit]
Description=node-temp-server
After=network.target

[Service]
WorkingDirectory=/opt/nodeserver
ExecStart=/bin/node server.js
Type=simple
Restart=on-failure
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=node-temp-server
User=apache
Group=apache
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Commands:

```sh
systemctl daemon-reload
systemctl enable node-temp-server
systemctl start node-temp-server
```
