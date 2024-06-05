# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup and Running
Mare sure you have the nodejs environment (> version 18)
```bash
# Make sure to install the dependencies
pnpm install
# Start the development server on `http://localhost:3000`
pnpm run dev
```

## Production
```bash
# Build the application for production
pnpm run build
# Locally preview production build
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


# Dockerfile setup
```bash
# enter the project directory
cd ./UniTrace
# docker image
docker build -t image-name .
# docker container
docker run -d -p port:prot --name container-name image-name
```