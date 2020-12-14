declare namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      SESSIONS_SECRET: string,
      MONGODB_URL: string,
      JWT_KEY: string
    }
}
