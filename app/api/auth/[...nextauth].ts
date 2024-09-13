// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
//
// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   // pages: {
//   //   signIn: '/auth/signin',
//   // },
//   callbacks: {
//     // async session({ session, token, user }) {
//     //   return session;
//     // },
//     // async jwt({ token, user, account, profile, isNewUser }) {
//     //   return token;
//     // }
//   },
// };
//
// export default NextAuth(authOptions);

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? (() => { throw new Error("GITHUB_CLIENT_ID is not defined") })(),
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? (() => { throw new Error("GITHUB_CLIENT_SECRET is not defined") })(),
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? (() => { throw new Error("NEXTAUTH_SECRET is not defined") })(),
  callbacks: {
    // Optionally configure callbacks
  },
};

export default NextAuth(authOptions);

