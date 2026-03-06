#!/bin/bash

# Hostinger VPS Deployment Script
# Ausführen auf dem VPS Server

set -e

PROJECT_NAME="ai-trust-layer"
DOMAIN="trustlayer.yourdomain.com"
EMAIL="admin@yourdomain.com"

echo "=== AI Trust Layer Deployment ==="
echo "Domain: $DOMAIN"
echo ""

# 1. System updates
echo "[1/8] Updating system..."
apt update && apt upgrade -y

# 2. Install Docker
echo "[2/8] Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
fi

# 3. Install Docker Compose
echo "[3/8] Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# 4. Create project directory
echo "[4/8] Setting up project directory..."
mkdir -p /opt/$PROJECT_NAME
cd /opt/$PROJECT_NAME

# 5. Clone repository (wenn verfügbar)
# git clone https://github.com/yourusername/ai-trust-layer.git .
# Alternativ: Dateien per SCP/rsync hochladen

echo "[5/8] Please upload your project files to /opt/$PROJECT_NAME"
echo "Then run: cd /opt/$PROJECT_NAME && docker-compose up -d"

# 6. Create .env file
echo "[6/8] Creating .env file..."
cat > docker/.env << EOF
POSTGRES_PASSWORD=$(openssl rand -base64 32)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
JWT_SECRET=$(openssl rand -base64 32)
WEBHOOK_SECRET=$(openssl rand -base64 32)
MEILI_MASTER_KEY=$(openssl rand -base64 32)
EOF

echo "[7/8] .env file created. Please update with your actual keys."

# 7. Setup Caddyfile
echo "[8/8] Setting up Caddy..."
sed -i "s/yourdomain.com/$DOMAIN/g" docker/Caddyfile

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Update docker/.env with your actual API keys"
echo "2. Upload project files: scp -r . user@$DOMAIN:/opt/$PROJECT_NAME/"
echo "3. Start services: cd /opt/$PROJECT_NAME/docker && docker-compose up -d"
echo "4. Setup Clerk auth at https://clerk.com"
echo "5. Configure your domain DNS to point to this server"
echo ""
echo "SSL will be automatically provisioned by Caddy."