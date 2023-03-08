# hookmanager

ShotGrid <> Discord webhooks for the BYU Animation 2023 capstone film (Accomplice)

## Installation

```bash
# install stuff
apt install npm nginx

# set up the hookmanager user
mkdir /opt/hookmanager
useradd hookmanager -d /opt/hookmanager -c "hookmanager service user" -s /usr/sbin/nologin -M
chown hookmanager:hookmanager /opt/hookmanager

# set up the firewall
ufw enable
ufw allow ssh
ufw allow http
ufw allow https

# clone the code
cd /opt/hookmanager
sudo -u hookmanager git clone https://github.com/scottdmilner/hookmanager.git
sudo -u hookmanager npm install
sudo -u hookmanager touch .env
# add the following to the .env file:
#   PORT=8000
#   DISCORD_HOOK_URL=<<Discord webhook url>>
#   SECRET_TOKEN=<<secret token for ShotGrid>>
#   RELOAD_TOKEN=<<secret token for GitHub>>

# set up nginx
cp ./hookmanager.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/hookmanager.conf /etc/nginx/sites-available/default
systemctl enable nginx
systemctl start nginx

# set up the service
cp ./hookmanager.service /etc/systemd/system/
npm install -g nodemon concurrently
systemctl daemon-reload
systemctl enable hookmanager.service
systemctl start hookmanager.service
```
Set up relevant webhooks in Discord, ShotGrid and GitHub.


## Development

```bash
sudo -u hookmanager git clone https://github.com/scottdmilner/hookmanager.git
sudo -u hookmanager npm install
sudo -u hookmanager touch .env
# populate .env with dummy data

npm run dev
```
