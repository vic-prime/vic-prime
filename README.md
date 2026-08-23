# VicPrime Market

**One Marketplace. Every Business.**

A social-commerce platform combining marketplace, social feed, stores, private chat, live streaming, and virtual-gifting economy.

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [Environment Configuration](#environment-configuration)
5. [Cloudflare Worker Backend](#cloudflare-worker-backend)
6. [Flutterwave Integration](#flutterwave-integration)
7. [Crown Coin Purchases](#crown-coin-purchases)
8. [Webhook Configuration](#webhook-configuration)
9. [Deployment](#deployment)
10. [GitHub Setup](#github-setup)
11. [Security Best Practices](#security-best-practices)
12. [Project Structure](#project-structure)

## Overview

VicPrime Market is a comprehensive social-commerce platform that integrates:

- **Social Feed** - Users can create posts, like, comment, share, and follow
- **Marketplace** - Products, services, and stores
- **Private Chat** - One-to-one messaging between users and store owners
- **Live Streaming** - Everyone can go live, receive viewers, comments, and gifts
- **Crown Coins** - Virtual gifting currency for live streams
- **Vic-Coins** - Promotion currency for boosting visibility
- **Flutterwave Payments** - Secure Crown Coin purchases

## Technology Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Worker API
- **Database**: Cloudflare D1 (relational data)
- **Storage**: Cloudflare R2 (media files)
- **Payments**: Flutterwave
- **Realtime**: WebSocket architecture for chat/live/gifts

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/vicprime-market.git
cd vicprime-market

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
