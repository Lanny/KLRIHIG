# KLRIHiG (Karl Lashley Rolls In His Grave)

Markov chain based algorithmic composition with Max/MSP!

Check out a quick demo of of the project generating novel music based on Bill Evans' Nardis [here](https://www.youtube.com/watch?v=tpaV6E_2p8Y).

## So what's it do?

It takes MIDI input, analyzes it, and builds a simple statistical model of it. It then uses this statistical model to generate novel music. You can think of it as "recombining" parts of an input piece of music to create something new.

## What'd Karl Lashley Ever do to You?
Nothing, I just thought the idea was kinda funny. There's a bit of a story.

In the early and mid 20th century behaviorism was popular and its "doctrine" was the dominant mode by which psychological research was being conducted in that era. Lots of behaviorist researchers did interesting and valid research, and while they agreed on the general protocol by which psychological investigation should be carried out they had widely varying philosophical commitments, and some well known figures had very... extreme views on what it's meaning to say about human cognition.

For some of the more radical thinkers in the field, there was an interest in explaining sequential behavior, series of actions that are carried out in a particular order such as playing the sequence of notes which make up a song, without reference to a mental "plan". It's difficult for a behaviorist to give a causal account of sequential behavior by talking about a subject's "plan" because the idea of a mental plan is private, it's neither stimulus nor is it observable behavior, and the behaviorist project was in part an effort to avoid issues of talking about private mental processes which can't be directly studied.

One idea which gained popularity is that sequential behavior occurs because of what was called "reflex chaining", that the act of doing one step of a sequential process served as stimulus for the next. This was a pleasing model to behaviorists because it didn't require talking about "plans" or internal states of subjects. If it's not obvious this notion of "reflex chaining", along with popular behaviorist ideas like conditioning, sounds a lot like using Markov chains in a generative context.

Karl Lashley was a psychologist who was a famous (and largely successful) opponent of this model (reflex chaining, not Markov chains). He actually brought up the example of playing a piece of music as a counter example, he pointed out that if a subject knows two pieces of music, A and B, which both begin with the same sequence of N notes, when he plays either the N+1th note of A, or of B, then his behavior of doing one rather than the other can't be explained simply in terms a reflex chain starting at the first note, the subject has received the same stimulus which would, under the reflex chaining explanation, elect both responses. And it's quite clear to us that which note is played at the end of a shared initial string is not merely a coinflip, it's a result of the subject's intention, or plan, to play one song rather than another.

But that's what generative Markov chains are: a probabilistic selection between possible state transitions. Now I don't imagine Lashley would actually have any problem with the notion of using this kind of model for algorithmic composition, he only (as far as I know) took issue with it as an explanation of sequential behavior in humans. I just think it's funny that a discarded model of behavior can actually be employed to make what I think is kind of an interesting way of generating music.
