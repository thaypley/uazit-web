module.exports = {
  apps: [
    {
      name: "uazit-web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/uazit-web",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_PB_URL: "https://pb.uazit.art",
      },
    },
  ],
};
