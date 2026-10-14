# Putting this on GitHub

Bench is meant to be the one public repository on a new GitHub account. One real project reads better than a row of empty forks.

Read `src/lib/shelf.ts` first. Those three notes are written in your voice from what you've said you use. Change any sentence you would not say on a call, then publish.

## 1. Create the account

If you don't have GitHub yet, sign up at [github.com](https://github.com). The username is public. `daviderthal` is a clean choice when it's available.

In the profile settings, set:

- Name: David Erthal
- Bio: `AE at Red Hat. I keep a hobby shelf of the tools I sell around.`
- Company: Red Hat
- Location: Austin, Texas
- Link: `https://www.linkedin.com/in/daviderthal`
- Photo: the same one you use on LinkedIn

## 2. Publish Bench

Create a **public** repository named `bench`. Leave it empty. GitHub's "add a README" box should stay unchecked, because this project already has one.

From this folder, if `origin` is not already your GitHub account:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/bench.git
git push -u origin main
```

GitHub will ask you to sign in. After the push, open the repository and confirm the README is the description of Bench, not a template.

Then on your profile, pin `bench`. One pin is enough until you have a second project you can explain.

## 3. Turn on the profile page

GitHub shows a special README when a repository has the exact same name as your username.

1. Create a public repository named `YOUR_GITHUB_USERNAME` (the same string as the account).
2. Add a file called `README.md`.
3. Paste the contents of `profile/README.md` from this project.
4. Replace `YOUR_GITHUB_USERNAME` in the Bench link.

That file is the whole page at `github.com/YOUR_GITHUB_USERNAME`.

## 4. What to do with Odysseus and Flipper

Leave them as links. Starring a repository is fine. Forking it onto your account looks like a contribution you didn't make, and a hiring manager who clicks through will notice the fork is empty.

## A paragraph you can paste on an application

I sell infrastructure software to technical buyers. I'm an account executive at Red Hat, on the IBM team, based in Austin. I joined from Broadcom, where I covered west-territory virtualization after the VMware acquisition, and before that I was in a commercial acquisition role at VMware in California.

The people I sell to live in platforms, security reviews, and developer workflows. I keep a GitHub so that part of the job stays concrete. Bench is the first project I've published: a small shelf of tools I actually use, including Cursor, the Odysseus workspace, and Flipper Zero. The notes are in my own words. I built the page in Cursor. I can change it, run it, and explain the files. Programming is a hobby I take seriously, in service of selling to people who do it all day.

## If someone asks what you built

Yes, this page. The three writeups are yours to edit and defend. Odysseus and the Flipper firmware are other people's projects that you use.

If they open the code:

- The words are in `src/lib/shelf.ts`.
- The list, the filter, and the margin notes are in `src/components/bench.tsx`.
- A project you add through the form is checked for a real `http` or `https` link, then saved in this browser under the key `bench.v1`. Refresh the page and it is still there. Another computer will not have it.

A good live demo is short. Open Flipper, read two sentences, add a project with a bad link and show the error, then add a real one and refresh.
