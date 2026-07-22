---
title: "Reflections on Rs: relocations, roots, etc."
date: 2026-07-16
slug: "reflections-on-rs"
description: "Reflections in July 2026"
categories: ["Personal"]
---

## Recently recurring reflections

At the time of writing this post in July 2026, my workplace [rime](https://rime.ai/) has been on a bit of a hiring spree, [following the finalisation of the Series A funding round](https://rime.ai/resources/rime-series-a-announcement).
This spree entailed some basic questions to be answered: What are the titles for the various roles? What are their responsibilities?
Then once the interviews started, those going through the interviews had questions of their own for me, the interviewer: How did you come to work at rime? What's your day-to-day like?

Indeed, great questions!
The Series A also coincided with my birthday so there was a natural milestone to ask myself those questions both descriptively (What *has been* my role at rime? How *did* I get here?) and normatively (What *should* my role be going forward?).
As I joined quite early,{{< sidenote >}}I believe as the first employee, alongside founders [Lily, Brooke, and Ares](https://rime.ai/company).{{< /sidenote >}} the answer was simple: everything related to data and modelling.
Now, at 35 people and perhaps many more by year's end?
Not too different, it turns out: still most things related to data and modelling.
Also, a new title: Staff Engineer.

As I was reflecting on these questions and looking around for blog posts and discussions on the topic, I stumbled onto Will Larson's book [Staff Engineer](https://staffeng.com/).
The book offered some role archetypes that quite resonated with me (the [Architect](https://staffeng.com/guides/staff-archetypes/#architect) and the [Solver](https://staffeng.com/guides/staff-archetypes/#solver)).
Most crucially, the book introduced me to a new term, Tanya Reilly's [Glue Work](https://www.noidea.dog/glue): the often-invisible connective work that holds a project and team together, anticipating who might get blocked by what tasks, improving process, filling the gaps between roles (my paraphrasing).

That of course posed more questions, some of which were asked by the interviewees: Isn't your PhD in Linguistics? How did you get into Engineering?
Fair questions.
Some questions came out of my own reflections: What are the recurring themes that have taken me across various areas of study in formal education?
What life experiences have shaped my approach to technical problems and working with others?
This post is a little summary of my findings so far.

## Relocations and resourcefulness

I understand it might sound strange to say that cardboard has been a common theme across my life.
But it goes hand in hand with the one fact that has heavily shaped it: I lived in 8 countries by 21.
Counting moves between cities in the same country, it was a move every 18 months on average.
As a result, while I didn't keep that many personal belongings, I did frequently have access to a pile of moving boxes or boxes that came with newly purchased things, and I certainly had a lot of fun making things out of cardboard.{{< sidenote >}}And still do, as pictured by my equal distribution template for the cake at my wedding party (2024).{{< /sidenote >}}

One of the earliest photos that I can still find of my cardboard creations is my attempt to make some fancy bike fenders while living in a small rural town in Burma in the 90s.
I must have seen some advertisements on TV that showed off cool kids riding around on bikes with the clip-on, short fenders that were unlike the full-coverage (ugly) fenders offered by the local bike shop.

{{< gallery >}}
{{< photo src="images/90s-bike.jpg" caption="My 90s bike, with fancy cardboard fenders." span="2" >}}
{{< photo src="images/90s-fenders.jpg" caption="The fenders I was trying to make." span="2" >}}
{{< photo src="images/cardboard-cake-cutting.jpg" caption="Wedding cake cutting template (2024)." span="2" >}}
{{< /gallery >}}

This was a memorable lesson in thinking through the various conditions in which an engineered artifact is expected to operate, so as to avoid catastrophic failure.
While these cardboard fenders undoubtedly made me the kid with the coolest bike during the dry season in which I dreamed them up and built them, the very first rains of the annual monsoon turned them into mush, literally leaving me with mud on my face.

Decades later in my [PhD dissertation](https://purl.stanford.edu/jx557wt1543), I ended up working on the topic of improving speech and language technologies for digitally-underserved languages.
At its core, it was a stubborn insistence that the benefits of modern speech models should not be limited to languages like English that dominate the internet, and a lot of creative experimentation with the limited data available in the vast majority of other languages.
After some refinement and with the help of many collaborators, some of those experiments did end up working well enough to turn into papers.
Of course many more lessons were learned along the way, but that early one still helps me get by most working days with substantially less mud on my face.

## Roots in rendering and refinement

Like many people of my age who have now ended up in technical fields, my first exposure to code was through blogging platforms.
In the early 2000s, websites like [Xanga](https://en.wikipedia.org/wiki/Xanga), [Friendster](https://en.wikipedia.org/wiki/Friendster), and [MySpace](https://en.wikipedia.org/wiki/Myspace) offered us young teens the ability to create and customise our profiles and posts.
You could wrap text with tags like `<b>bold</b>` and the browser would render that text **bold**!
Naturally, it wasn't too long before I also started having a go at full-stack web development with the classic [LAMP stack](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) of that era.

This coincided with a couple of back-to-back moves: from Malaysia to Singapore and then a year later to Mackay, Australia in 2004.
Being brand new to a country and yet to get to know many people, I spent a lot of my time at my computer tinkering with things, posting questions and answers in web forums and, evidently, running an unsuccessful freelance web development business.

Looking through my Gmail inbox from ~2004, I found several e-mail threads of client back-and-forths, some with screenshots and one with the entire source code that I sent in a zip file (the Holy Name High School Basketball Team website).
Miraculously,{{< sidenote >}}Thanks to Claude Code but, more importantly, pre-existing Docker images to simulate an old LAMP stack.{{< /sidenote >}} I got the website rendering in a browser again, now some 22 years later.
As shown in the screenshots below, it had a front page for team news (the delivered form had dummy preview data, with opponents such as "LA Lakers" and "NY Knicks") and a set of backend pages behind a login to manage the information.
So all in all, I'd say the website itself was a successful technical project.

{{< gallery >}}
{{< photo src="images/web-hnhs-index.png" caption="Holy Name High School Basketball, index (2004)." span="2" >}}
{{< photo src="images/web-hnhs-admin.png" caption="Holy Name High School Basketball, admin page (2004)." span="2" >}}
{{< photo src="images/web-ore.png" caption="Rime Ore (2026)." span="2" >}}
{{< /gallery >}}

The unsuccessful part?
Well, going by that e-mail thread and several others, I don't think I got payment from these clients (ah, the life of freelance jobs).
But I did learn a lot about how to jointly design user interfaces for different user roles (public, admins, etc.) alongside the database schema (what is a player? what is a user?), then refine it all from my own testing and user feedback.
For some extra cash though, I probably would have been better off doing more regular teenage ventures like mowing the neighbour's lawn.

Recently, I have been leading the project to develop our own in-house speech annotation platform called *Ore* — a place where we refine raw speech data with human-verified transcriptions, a.k.a. 'gold' transcriptions.{{< sidenote >}}Thanks to Michael Cullan, who helped with a lot of the implementation work in modern frameworks.{{< /sidenote >}}
This has been a real return to roots in terms of web development work, but doubly so since collaborative speech annotation was also the topic of my first conference paper a decade prior [(San, 2016)](https://zenodo.org/records/7586620?preview_file=Nay-SST2016.pdf).
I think there's something uniquely rewarding about being given free rein to bring into reality your specific vision of a niche work tool that combines all the good parts of the existing ones you have used over the years and, as much as possible, avoids the parts that caused you repeated frustration.
In a welcome departure from my teenage years, however, I didn't have to go around chasing up payments for this project.

## Recall and retrieval

I'm envious of friends who can listen to a couple of notes of a tune and say "Oh, that's in B minor".
I've played music for years and get by with an assortment of aids (chord charts, tabs, and so on).
Some aspects do come without much thinking now, like playing certain chord shapes and progressions on the guitar.
Other aspects still feel persistently foreign, like telling what key a tune is in, which still takes a bit of conscious effort and a couple of wrong guesses.

Spoken and written information, though, I can recall with little effort, or know exactly what to search to retrieve.
Part of it is from being constantly online since the early 2000s.
Like many of us, I have just memorised keywords to get to perpetually purple links to retrieve particular reference pages (in my case: [GNU Parallel's replacement strings](https://www.gnu.org/software/parallel/parallel_tutorial.html#replacement-strings)).
Another part is that all the social resets from moving so often made me well practised at meeting people.
It is simply second nature for me to remember the things people say about themselves and the brand-new place I'd arrived in, to be able to read the room and recall a funny detail when I know it'll land (and have the sense to keep it to myself when I'm not 100% sure).

Perhaps it's no surprise then that I've ended up spending a lot of my working life so far on a certain type of question: How do we make a given collection of spoken or written language easily accessible to those who care about it, in the ways they want to access it?

One of the highlights of my working career was helping finalise the [Warlpiri Encyclopaedic Dictionary](https://shop.aiatsis.gov.au/products/warlpiri-encyclopaedic-dictionary).{{< sidenote >}}For a more complete history of the project, which I cannot do enough justice here, see [*Six decades, 210 Warlpiri speakers and 11,000 words: how a groundbreaking First Nations dictionary was made* (2023)](https://theconversation.com/six-decades-210-warlpiri-speakers-and-11-000-words-how-a-groundbreaking-first-nations-dictionary-was-made-205019).{{< /sidenote >}}
The dictionary began in 1959 with hand-written index cards, which were typed up in the 1980s, and has since been kept as a single hand-edited text file, which was just shy of 150,000 lines by the time I came on board in 2017.
I hope to cover more of the details in [an upcoming post](https://www.resunay.com/writing/warlpiri-encyclopaedic-dictionary/), but the gist of my involvement was to help test every one of the 11,000 words (is it well-formed? does the definition appear before the example sentences? are the cross-references to other words resolvable?) and render the dictionary into several formats (preview versions in HTML and PDF, and InDesign-compliant XML for the publisher).
After many rounds of refinement, proofreading, and correction, the 1400-page published dictionary appeared in 2023 (see the cover page and the final *yinarlingi* entry on the bottom-left).

{{< gallery >}}
{{< photo src="images/warlpiri-dictionary-1959-to-2022.png" caption="The yinarlingi entry across its lifespan." span="2" >}}
{{< photo src="images/warlpiri-dictionary-2023.jpg" caption="The published Warlpiri Encyclopaedic Dictionary (2023)." span="2" >}}
{{< photo src="images/web-core-example.png" caption="Rime Core, populated with dummy data (2026)." span="2" >}}
{{< /gallery >}}

I recently took it upon myself to develop rime's central data cataloguing system, which I named *Core* (see screenshot above with dummy data).
As the classic story goes: when it was just a few people, it was fine to have fairly manual processes (hand-typing filenames, copy-pasting between a handful of spreadsheets, etc.).
Fast forward 3 years, there were a ton of accumulated audio recordings, datasets, model files, and probably hundreds of spreadsheets.
Given this setup, seemingly simple questions (what speakers are in this model again?) were becoming tedious to answer (uh, let me track down a few spreadsheets and get back to you).
At this time I had yet to encounter the Staff Engineer book and the idea of Glue Work, but it felt entirely natural to just go ahead and build a thing that organised and connected all the different parts so people could retrieve the information that they were after in a self-serve manner.
Okay, yes, admittedly maybe also just a little self-serving so things didn't depend as much on my own recall.

## Recipes, representations, and reality

From June-July 2013, my then housemate Jo and I ran a little [cooking blog](https://behindabluedoor.wordpress.com/) with dishes that we made before our lease was up.
Like any sharehouse, we had the occasional dinner party but decided that given the deadline we should have many more before then.
We must have brainstormed and tried dozens of recipes during that time, many of which never made it to the table for others, let alone the blog.
Even for recipes with literal step-by-step instructions in front of us, I remember a distinct sense of repeated surprise in some of the context-specific details we still had to figure out (Oh, where do we source that ingredient? Can we substitute? Actually, isn't Pete allergic to that?).
Only years later did I come across one of my all-time favourite blog posts, John Salvatier's 
[Reality has a surprising amount of detail (2017)](https://johnsalvatier.org/blog/2017/reality-has-a-surprising-amount-of-detail).
I often think back to this post and the recipe blog days whenever I see a sequence of steps that seem just a little too high-level (for my tastes) or assume certain preconditions.

{{< gallery >}}
{{< photo src="images/web-bhbd.png" caption="Pumpkin Soup, from Behind a Blue Door (2013)." span="2" >}}
{{< photo src="images/phd-acknowledgements.png" caption="Acknowledgements from PhD presentation (2024)." span="2" >}}
{{< photo src="images/oakland-birthday.jpg" caption="Nay and Lily's annual joint birthday party (2026)." span="2" >}}
{{< /gallery >}}

Recipes for working with speech representations have been the bulk of my work over the last half-decade, starting with questions of how newly developed transformer-based representations (wav2vec2) helped with [speech information retrieval](https://arxiv.org/abs/2103.14583), and working towards figuring out [how to adapt those representations for under-represented languages](https://aclanthology.org/2024.sigtyp-1.13/).
There were, uh, quite a few surprises along the way.
That last paper ([San et al., 2024](https://aclanthology.org/2024.sigtyp-1.13/)), for example, began its life as a subset of experiments in another paper ([San et al., 2023](https://aclanthology.org/2023.computel-1.1/)).
But the submission deadline was looming, and the initial version of the recipe was just not cooperating, so I decided they needed to get cut out and refined for almost another year.
I say "I" here with regard to direction, but, as can be gleaned from the author list in my papers (averaging 10), I couldn't have landed on the evidence I needed to inform those decisions without the help from a ton of people.

Interestingly, all this work during my PhD was in the direction of going from speech to representations, so before starting at rime I had not worked in the reverse direction: rendering (text) representations back to speech.
In some ways, there are actually a lot more details to be figured out.
In the encoding direction, you're starting with an enriched form and trying to throw out all the things that are not relevant.
In the rendering direction, however, you're taking an under-defined form (text) and figuring out how to add the details back in.
Working in the reverse direction at rime these days means that, like the rest of the stories above, I've come full circle (back to reality!).
There's still a ton to figure out, but in my experience there is quite a reliable recipe for coping when there's an overwhelming amount of detail being demanded by reality — a recipe that, if I recall correctly, is getting by [with a little help from my friends](https://en.wikipedia.org/wiki/With_a_Little_Help_from_My_Friends).
