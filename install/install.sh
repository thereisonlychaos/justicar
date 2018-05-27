apt-get install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get update
echo "Installing IRC server"
apt-get install inspircd
echo "Installing nodejs"
sudo apt-get install -y nodejs
echo "Node Version Check (should be >= 8)"
nodejs -v

echo "Copying example environment file"
cp example.env ../.env
