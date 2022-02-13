# Install

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
