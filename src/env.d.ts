/// <reference types="astro/client" />

import type { Account } from './lib/auth/types';

declare global {
  namespace App {
    interface Locals {
      /** The signed-in account, resolved once per request by the middleware. */
      account: Account | null;
      /** False when accounts are gated off or unconfigured. See ACCOUNTS.md. */
      accountsEnabled: boolean;
    }
  }
}

export {};
