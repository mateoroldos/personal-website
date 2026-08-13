---
title: "Notes on agentic coding"
description: "Seven notes to myself after two years of coding with agents."
pubDate: 2026-08-20
---

I still remember the day a coworker showed me GitHub Copilot. The tool seemed like magic. You wrote code the way you always had, and a smart robot guessed the rest. You simply took the guess or ignored it. A calm assistant that respected your workflow.

Suddenly these nice assistants became anything but calm. As the models got better and the tooling improved, they started writing complex features from the ground up. With a single prompt they could produce thousands of lines of code.

This revolution made the workflows I spent years mastering obsolete almost overnight. Opening the editor and writing a feature by hand stopped being a reasonable choice.

Agents are much faster and more powerful than me. An agent can write more code in an hour than I can read in a day. This gave us a lot of power, but it also amplified the risks and flaws they come with.

So these are some notes for myself. A place to stop for a second and organize what I think about these new ways of working.

## How the tools fail

Every agentic workflow runs on two things: an LLM and a harness. The LLM is the brain, a probabilistic guesser trained on an unreasonable amount of the internet. The harness is the tool that brain uses to read and edit code.

Both got really, really good. Modern models are precise and can work for long sessions without losing the thread, and harnesses have grown a lot of clever machinery to get them there. But the nature of the thing hasn't changed, and two flaws come straight out of it.

### Most probable is not always correct

These machines are optimized to guess the most probable answer. If they do their job well, they give me the answer best supported by the data they were trained on. Most of the time that is also the correct answer. Not always — and the gap is invisible from the outside, because a wrong answer arrives with exactly as much confidence as a right one.

### Short term thinking

LLMs think in prompt → answer. Their job is done when the thing in front of them works. That makes them very good at the immediate problem and blind to what it costs later. They will make sure the feature works. They will rarely find the simplest or the most maintainable way to do it. They will just make it work.

Give them free rein for a few sessions and the codebase turns into a mess nobody can maintain. Not me, and not them either.

![Two photos: a single clean railway track labeled "apps built with no AI in 5 hours", and a chaotic tangle of switching tracks labeled "apps built with AI agents in 5 min".](/blog/tracks.jpeg)

This takes me to my first conclusion. With the current state of the technology, not reviewing the code is not an option.

Yes, agents can produce disposable prototypes without us worrying about the code. But agents still make a lot of errors and can't produce long-term maintainable software autonomously. At least not yet.

What follows are seven principles and techniques that made my life easier while working with coding agents. They improved the quality of my work while protecting my cognitive energy.

None of them are new. Most are ordinary engineering practices, older than I am. But now that code is produced at an unprecedented pace, they are more important than ever.

## 1. Short loops, small diffs

Agents can write a whole application from scratch, but that doesn't mean I should let them. The longer I let it run, the more expensive the mistake, and mistakes compound in a direction I can't see.

Same for code reviewing. The larger the diff the more cognitive energy I spend reviewing it.

This protects our real bottleneck, which is human attention and judgment, while ensuring code quality and maintainability.

_Slow is smooth, smooth is fast._

## 2. Type driven development

This is the single technique that helped me the most.

Think of programs as types first, and get your agents to think and communicate the same way.

Before writing any logic, take domain modeling seriously. Agree with the agent on what things are, what states the program can be in, and what each function takes and returns. Implementations derive from that almost on their own.

Signatures become specs:

```ts
login(email: Email, password: Password):
  Effect<Session, InvalidCredentials | RateLimited, UserRepo>
```

Look at that function signature. It shows what it returns, every way it can fail, and what it needs to run. Nothing true about that function hides in the body.

That code is in [Effect](https://effect.website/). If you can't use it at work, find another way to return errors as values and fight throwing at all costs. Knowing how a function may fail is as important as knowing its happy path.

## 3. Agree on the shape, not the implementation

This goes hand in hand with the previous one.

When planning, agree on the shape of the solution first and delegate the implementation after.

Optimize your agents to communicate using domain types, dependency arrows, file trees, and callstacks rather than prose. This will make system design communication way simpler for you and your agents.

If domain models and function signatures are the lego blocks of our systems, callstacks are how these legos get combined.

```text
login(email, password) → Effect<Session, InvalidCredentials | RateLimited>
  ├─ UserRepo.credentialsFor(email) → Option<PasswordHash>  (none → InvalidCredentials)
  └─ SessionService.issue(userId)   → Session
```

I can read that in a minute and know whether I disagree with the design. I can't do that with 50 words of prose.

So this is where the line sits for me. I don't delegate the design and understanding of the system, I delegate the tedious part of writing the lines.

_Much of this was stolen from watching [Dillon Mulroy](https://x.com/dillon_mulroy) work._

## 4. Lean on the VCS

Version control has always been a key tool in a programmer's toolbox. It can also help a lot in agentic coding.

Agree with your agent on a VCS workflow you feel comfortable with and is optimized for reviewability.

I make each agent turn land as at least one commit. If I don't like the turn, I throw it away. If I like it, I squash it or keep it as its own commit. Reviewing gets much easier when the unit of review matches the unit of work.

I plan with it too. When I agree on the shape of a change, I also agree on the commits it will land as. These can change as we work, but it's a nice way to know I'm aligned with my agent.

## 5. Deterministic checks

Every deterministic code check is a piece of feedback that isn't me. This lets the agent catch errors before we review.

Old engineering advice again: use your compiler and your linter to their maximum. Learn them properly, make them strict, and forbid the mistakes you keep seeing.

An agent change is done when `check-types`, `test`, `check`, and `knip` all pass.

- [knip](https://knip.dev/) checks for dead code, which agents leave everywhere — an old helper they replaced, an export nobody imports.
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) turns the architecture we agreed on into a config file. It makes package dependencies explicit, rejecting impossible relations.
- Custom AST rules catch what used to be taste: no vague names, no `sleep` in tests. Things I would have put in a style guide that nobody reads, including me.

Speed matters more than it used to. [oxlint](https://oxc.rs/) and [ts-go](https://github.com/microsoft/typescript-go) run in milliseconds, so the check loop costs the agent nothing and it runs it far more often. Then ask it to fix whatever came back, every turn.

The ultimate goal is making mistakes not fit in the repo.

## 6. Observability

More code means more debugging, so having the right tools is more important than ever.

![Meme: before AI, two hours coding and six hours debugging. After AI, five minutes generating and twenty-four hours debugging.](/blog/debugging-after-ai.webp)

Design with top-quality observability in mind and your future self will thank you.

Debugging becomes easier and you have an extra tool to improve system knowledge. Give agents access to these tools and they will debug their own work.

OTEL, wide events, whatever fits your project. Just take it seriously.

## 7. Work in parallel

The previous notes made agentic development feel more like serious engineering and less like a stressful _hoping the agent gets it right_ workflow.

But they come with the tradeoff of slower, more controlled loops.

To unlock some extra speed I believe parallel working is a must. Yes, it's challenging for our attention, but the previous notes are what leave me with enough of it to spend.

We should make repositories and dev tooling optimized for working with `git worktree` or `jj workspace`. We should be able to create a parallel working copy of our repos in seconds.

## What I'm not sure about

Someone will point at Bun as a counter-argument to these notes. One person rewrote 535,000 lines of Zig into Rust in eleven days with up to 64 agents running at once, and it's in production. Andrew Kelley, who created Zig, [called it unreviewed slop](https://www.theregister.com/devops/2026/07/14/zig-creator-calls-buns-claude-rust-rewrite-unreviewed-slop/5270743). Both are true.

Nobody reviewed 535,000 lines. There was a porting guide, deterministic workflows, an enormous existing test suite acting as the source of truth, and a reference implementation that already worked. The feedback wasn't a human, it was the repo. Most projects don't have one, and building one is the actual work.

Tests the agent writes are not evidence. If it writes the code and the test, the two can agree on the wrong behavior all day. The deterministic checks work because they sit outside the agent. Tests only work when the intent came from me or I carefully reviewed them.

## Anyway

Coding changed more in the last two years than in the ten before it. Ethan Niser wrote [we're not holding back the ocean](https://ethanniser.dev/blog/not-holding-back-the-ocean), and his line is the one I keep coming back to: do you like cutting film, or do you like making movies?

I like making things. So most of this will probably be wrong in six months, and that's fine. The skill isn't having the right system. It's changing as fast as the ground does.

As a final note to myself: calm down. Anxiety has never helped. Agree on the types, keep the loop short, let the machine say no, and go outside for a while.

## Bonus

In case any of this was useful, here are some tools that made my life easier with these frenetic machines, and a list of the people I learned the most from.

### Tools

- [Effect](https://effect.website/) — the single technology that improved my agent-generated code the most. Makes type driven development and observability first class. Hard at first, 100% worth the effort.
- [jujutsu](https://jj-vcs.github.io/jj/) — simpler and more powerful than git. Together with jjui it makes version control fast and natural.
- [herdr](https://herdr.dev/) — like tmux but built for agents. Add the [jj workspace plugin](https://github.com/NathanFlurry/herdr-plugin-jj-workspace) and you can manage workspaces directly from it.
- [oxlint](https://oxc.rs/) — like eslint but far faster. Linting takes milliseconds, so agents iterate faster.
- [portless](https://portless.sh/) — a must for parallel worktrees, because local ports stop colliding.
- [maple](https://github.com/MapleTechLabs/maple) — observability platform that works in a local dev setup with almost no effort. A hidden gem.
- [tuicr](https://tuicr.dev/) — local code review matters more than ever. It has helped me a lot to read diffs and comment on them.
- [Plannotator](https://plannotator.ai/) — lets me visualize and annotate markdown, which turned out to be another useful way to iterate with agents.

### People

- [Dillon Mulroy](https://x.com/dillon_mulroy) — learned a lot watching him work live on [Twitch](https://www.twitch.tv/dillon).
- [Thorsten Ball](https://x.com/thorstenball) — his blog [Register Spill](https://registerspill.thorstenball.com/) is a regular read.
- [Makisuo](https://x.com/makisuo) — creator of maple. The [repo](https://github.com/MapleTechLabs/maple) is a top quality Effect-based open source project. Follows many of the principles I've talked about.
- [Kit Langton](https://x.com/kitlangton) — his [site](https://kitlangton.com/) and content explain Effect with real clarity.

### Repo

All of these ideas live in a template I'm creating. It's an opinionated TypeScript repo whose single goal is to be highly optimized for agentic development. Check it at [effect-template](https://github.com/mateoroldos).
