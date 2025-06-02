# **NovaBid Monorepo**

## **Demo**

- 🔗 **Live Demo**: [https://novabid.app](https://novabid.app)
- 🎥 **Video Presentation**: [https://www.conexionssee.com/novabid/presentation.mp4](https://www.conexionssee.com/novabid/presentation.mp4)

---

## **Frontend Screenshots**

### **User Interface Preview**

![NovaBid Frontend Screenshot](./screenshot1.png)
![NovaBid Voting Interface](./screenshot2.png)

---

## **Introduction**

**NovaBid** is a decentralized, privacy-first voting and auction platform built on the Avalanche network, powered by the **eERC20 standard** from AvaCloud.

It allows users to:

- Launch and participate in **private voting rounds**
- Create and manage **confidential auctions**
- Earn and use eERC20 tokens in real scenarios

This monorepo includes:

- `novabid-frontend` (React + Vite)
- `novabid-cli-backend` (JavaScript CLI)
- `eercdeployer-backend` (TypeScript deployment scripts)

---

## **Prerequisites**

Before running the project, ensure you have:

- **Node.js** (v18 or higher)
- **Git**
- **NPM** (recommended)

---

## **Project Structure**

```plaintext
novabid/
├── novabid-frontend/
├── novabid-backend/
```

---

## **Frontend**

### **Features**

- Create and join voting sessions
- Participate in privacy-preserving auctions
- Vote anonymously using eERC20 tokens
- Faucet to mint test tokens
- Real-time voting results
- Mobile-first responsive UI

### **Installation and Usage**

```bash
git clone https://github.com/didierjey8/novabid
cd novabid/novabid-frontend
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

### **Environment Variables**

Create a `.env` file in `novabid-frontend` with:

```env
VITE_API_URL=https://your-backend-url.com
```

---

## **Backend**

### **Features**

- Token creation on-chain using eERC20
- Verifier and zk-SNARK circuit deployment

### **Installation and Usage**

```bash
npx hardhat compile
npx hardhat zkit make --force
npx hardhat zkit verifiers
```

To deploy the contracts:

```bash
npx hardhat run scripts/deploy-standalone.ts --network localhost
# or
npx hardhat run scripts/deploy-converter.ts --network localhost
```

### **Environment Variables**

Add a `.env` file in the backend root with:

```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://your-avax-rpc-url
PORT=3000
```

---

## **Deployment**

### **Frontend**

Deploy using:

- **Cloudflare Pages**
- **Vercel**
- **Netlify**

Ensure the `base` path is correctly configured in `vite.config.js`.

### **Backend**

Recommended platforms:

- **Render**
- **DigitalOcean App Platform**
- **AWS ECS**

Use a managed database like **Supabase** or **Neon**.

---

## **Technologies Used**

- ⚛️ **React** with **Vite**
- 🎨 **TailwindCSS**
- 🧩 **Express.js**
- 🔐 **eERC20** + `ethers.js`
- ☁️ **Cloudflare Pages**
- 🤖 **N8N** Agent for workflows

---

## **License**

Licensed under the **MIT License**.

---

## **Contact**

For questions, open an issue or contact us:

📧 [didierjey8@gmail.com](mailto:didierjey8@gmail.com)
