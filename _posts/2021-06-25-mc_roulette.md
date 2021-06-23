---
layout: post
title:  Roulette - To Play or Not to Play
subtitle: RL Basics
permalink: /blog/rl_mc_roulette/
tags: [Reinforcement Learning, Monte Carlo, MC Control, RL Basics, RL Games]
comments: true
share-img: https://raw.githubusercontent.com/shirsho-12/shirsho-12.github.io/master/images/rl/rl_theme.png
---
 
Previously, we looked into the Monte Carlo family of reinforcement learning algorithms. These methods estimate the solution to a RL problem by _learning from experience_. Just by simulation and blind exploration, Monte Carlo agent reaches the optimal solution. 

Today, we will go through an interesting case: the game of roulette. We will discover the optimal strategy to win at roulette and hopefully close down a few casinos in the process.  


### The Game

A roulette wheel consists of a spinning disk with divisions around its edge that revolves around the base of a bowl. A ball is spun around the outside of the bowl until eventually ball and wheel come to rest with the ball in one of the divisions. The divisions around the wheel are numbered from 1 to 36 in a seemingly random pattern and alternate red and black. Prior to rolling the ball, people place bets on what number will come up by laying down chips on a betting mat, the precise location of the chips indicating the bet being made<sup>[1](#myfootnote1)</sup>.

## The Player

We will set up the game in OpenAI Gym's **Roulette-v0** environment. Let's first do the basic imports.

```py
import torch
import gym
```

The agent (our algorithm) interacts with the environment we create here.
```py
env = gym.make("Roulette-v0")
```

Our agent will play the game a number of times, each time choosing to either bet on a number of walk away with its winnings. There are 4 sets of possible actions:

- The agent bets on an even number (except 0).
- The agent bets on an odd number.
- The agent bets on 0.
- The agent walks away from the board.

There are 3 possible types of rewards for the agent's action.

- The rolled number is not zero and its parity matches the agent's bet -> +1
- The rolled number's parity does not match the agent's bet -> -1
- The rolled number and the agent's parity are both zero -> +36

Betting on a zero is the highest risk, highest reward outcome. 

Our agent therefore has 38 possible actions to choose from - the numbers 0 to 36 and walking away (37).

```py
num_actions = env.action_space.n
print(num_actions)
>>> 38
```

In the roulette simulation, the environment only has one state. This is because a game ends after one action (the bet). This state is denoted by 0.

```py
num_states = env.observation_space.n
print(num_states)
>>> 1
state = env.reset()
print(state)
>>> 0
```

The outcome for an action can be -1, 1, 0 or 36.

```py
env.step(1)  # Ball lands on odd number
>>> (0, 1.0, False, {})
env.step(1)  # Ball lands on even number / zero
>>> (0, -1.0, False, {})
env.step(0)  # Ball lands on zero
>>> (0, 36.0, False, {})
env.step(37) # Agent walks away
>>> (0, 0.0, True, {})
```

The game will end if the agent walks away (action 37) or after 100 spins of the wheel/iterations.


# The On-Policy Strategy

The first way in which we'll solve this problem is using on-policy Monte Carlo control. Here we will use the ϵ-greedy approach to update the policy function. 

## The Simulation

Let's first start by defining the episode simulating function using ϵ-greedy.

```py
def run_eps_episode(env, Q, epsilon, num_actions):
    state = env.reset()
    memo = []
    is_done = False
    # epsilon-greedy starting probabilities
    proba = torch.ones(num_actions) * epsilon / num_actions    
    while not is_done:
        best_action = torch.argmax(Q[state]).item()
        proba[best_action] += 1 - epsilon
        # Choose 1 action from the multinomial distribution
        action = torch.multinomial(proba, 1).item()               
        
        new_state, reward, is_done, info = env.step(action)
        memo.append((state, action, reward))
        state = new_state
    return memo

```
The initial probabilities in the ϵ-greedy policy is ϵ/size of the action space: `proba = torch.ones(num_actions) * epsilon / num_actions`. 

Every iteration we update the likelihood of the best action by 1-ϵ: `proba[best_action] += 1 - epsilon`. The best action is selected from a multinomial distribution (a distribution with many outcomes) using `torch.multinomial(proba, 1)`.

Here we are storing the states, actions, and rewards as a list of triples `(state, action, reward)`. This makes iterating through them cleaner. 

## The Algorithm
We use first-visit Monte Carlo to evaluate state-action pairs returned from each simulation.

We will use a new data type, the `defaultdict` to keep track of rewards, frequency and the Q-function. `defaultdict` is a part of the built-in `collections` library. 

```py
from collections import defaultdict
```

We have to assign a datatype or structure to `defaultdict` declarations. This is the default value for any key. For example,

```py
d1 = defaultdict(int)
print(d1[5])
>>> 0
```
If the key does not exist, it is automatically set to the default value. Similarly,

```py
d2 = defaultdict(lambda: torch.zeros(num_actions))
```

`lambda` is an inline function. Here a tensor of zeroes is created for each key. Another function we use here is `tqdm`. This is a very pleasant wrapper that I highly recommend. Wrap it around a function or a loop and you can see a real-time progress bar.

```py
from tqdm import tqdm
```
  
If you don't already have the library, use `pip install tqdm` in the terminal. We will see how `tqdm` works below.


```py
def on_policy_mc_control(env, gamma, epsilon, num_episodes):
    num_actions = env.action_space.n
    G_sum = defaultdict(float)
    N = defaultdict(int)
    Q = defaultdict(lambda: torch.zeros(num_actions)) 
    for episode in tqdm(range(num_episodes)):
        memory = run_eps_episode(env, Q, epsilon, num_actions)
        net_reward = 0
        G = {}
        for state, action, reward in reversed(memory):
            net_reward = gamma * net_reward + reward
            G[(state, action)] = net_reward
        for state_action, net_reward in G.items():
            G_sum[(state, action)] += net_reward
            N[(state, action)] += 1
            Q[state][action] = G_sum[(state, action)] / N[(state, action)]
    policy = {}
    for state, actions in Q.items():
        policy[state] = torch.argmax(actions).item()
    return Q, policy
```

We first define our dictionaries

```py
G_sum = defaultdict(float)
N = defaultdict(int)
Q = defaultdict(lambda: torch.zeros(num_actions)) 
```
`G_sum` records the total rewards through all episodes. `N` keeps track of the frequency of each state-action pair. A state-action pair is simply the tuple `(state, action)`. `Q` is the Q-function, the function that keeps track of the value of state-action pairs.

```py
for episode in tqdm(range(num_episodes)):
```
`tqdm` shows a progress bar and tells you how long it will take for execution to complete.

```py
memory = run_eps_episode(env, Q, epsilon, num_actions)
net_reward = 0
G = {}
for state, action, reward in reversed(memory):
    net_reward = gamma * net_reward + reward
    G[(state, action)] = net_reward
```
We initially set the net reward to 0. This is the discounted reward. At each `(state, action, reward)` tuple, the net reward is updated and stored in `G`.

```py
for state_action, net_reward in G.items():
    G_sum[(state, action)] += net_reward
    N[(state, action)] += 1
    Q[state][action] = G_sum[(state, action)] / N[(state, action)]
```

At the end of each episode, we add the values in `G` to `G_sum` and increment the frequency counter `N` by 1 (first-visit MC). We then update the Q-function to the new average. 

The benefit of using `defaultdict` is that we don't need to check if a key initially exists. The code simplifies from

```py
if (state, action) in N.keys():
    N[(state, action)] += 1
else:
    N[(state, action)] = 1
```
to
```py
N[(state, action)] += 1
```

After numerous sample episodes, we approximate the optimal Q function, which in turn translates to the optimal policy.

## The Results

#### Footnotes

<a name="myfootnote1">[1]</a> Master Traditional Games. [Rules of Roulette](https://www.mastersofgames.com/rules/roulette-rules.htm)