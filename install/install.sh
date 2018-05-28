apt-get install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get update
echo "Installing IRC server"
apt-get install -y inspircd
echo "Installing nodejs"
sudo apt-get install -y nodejs
echo "Node Version Check (should be >= 8)"
nodejs -v

echo "Installing MongoDB"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org

sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl enable mongod

echo "Copying example environment file"
cp example.env ../.env
