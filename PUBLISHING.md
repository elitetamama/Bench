# Putting this on GitHub

The account is [github.com/elitetamama](https://github.com/elitetamama). It has no public repositories yet, so Bench can be the first thing on it.

Read `src/lib/shelf.ts` first. Those three notes are written from what you've said you use. Change any sentence you would not say on a call, then publish.

## 1. Finish the profile

The bio is already in good shape: "AE at @RedHat, Selling Open Source to Engineering Teams, and I tinker on the side."

On [the profile settings page](https://github.com/settings/profile), fill the fields that are still empty:

- Name: David Erthal
- Company: Red Hat
- Location: Austin, Texas
- Website: `https://www.linkedin.com/in/daviderthal`

The username stays `elitetamama`. The name field is what a hiring manager reads next to the photo.

## 2. Publish Bench

Create a **public** repository named `bench` at [github.com/new](https://github.com/new). Leave it empty. GitHub's "add a README" box should stay unchecked, because this project already has one.

This project already has a remote named `origin` for the Cursor workspace. Add GitHub as a second remote and push `main`:

```bash
git remote add github https://github.com/elitetamama/bench.git
git push -u github main
```

GitHub will ask you to sign in. After the push, open [github.com/elitetamama/bench](https://github.com/elitetamama/bench) and confirm the README is the description of Bench.

Then on [your profile](https://github.com/elitetamama), choose Customize your pins and pin `bench`. One pin is enough until you have a second project you can explain.

## 3. Turn on the profile page

GitHub shows a special README when a repository has the exact same name as your username.

1. Create a public repository named `elitetamama`.
2. Add a file called `README.md`.
3. Paste the contents of `profile/README.md` from this project.

That file is the whole page at [github.com/elitetamama](https://github.com/elitetamama). The Bench link in it already points at `elitetamama/bench`.

## 4. What to do with Odysseus and Flipper

Leave them as links. Starring a repository is fine. Forking it onto `elitetamama` looks like a contribution you didn't make, and a hiring manager who clicks through will notice the fork is empty.

## A paragraph you can paste on an application

I sell infrastructure software to technical buyers. I'm an account executive at Red Hat, on the IBM team, based in Austin. I joined from Broadcom, where I covered west-territory virtualization after the VMware acquisition, and before that I was in a commercial acquisition role at VMware in California.

The people I sell to live in platforms, security reviews, and developer workflows. I keep a GitHub so that part of the job stays concrete. Bench is the first project I've published: a small shelf of tools I actually use, including Cursor, the Odysseus workspace, and Flipper Zero. The notes are in my own words. I built the page in Cursor. I can change it, run it, and explain the files. Programming is a hobby I take seriously, in service of selling to people who do it all day.

https://github.com/elitetamama/bench

## If someone asks what you built

Yes, this page. The three writeups are yours to edit and defend. Odysseus and the Flipper firmware are other people's projects that you use.

If they open the code:

- The words are in `src/lib/shelf.ts`.
- The list, the filter, and the margin notes are in `src/components/bench.tsx`.
- A project you add through the form is checked for a real `http` or `https` link, then saved in this browser under the key `bench.v1`. Refresh the page and it is still there. Another computer will not have it.

A good live demo is short. Open Flipper, read two sentences, add a project with a bad link and show the error, then add a real one and refresh.
