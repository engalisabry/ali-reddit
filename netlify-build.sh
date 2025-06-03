#!/bin/bash
pnpm install
pnpm prisma generate
pnpm build
