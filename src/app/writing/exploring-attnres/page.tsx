import type { Metadata } from 'next';
import Image from 'next/image';

import AlphaGatePipeline from '@/components/exploringattnres/AlphaGatePipeline';
import CodeBlock from '@/components/exploringattnres/CodeBlock';
import DatabaseGrowth from '@/components/exploringattnres/DatabaseGrowth';
import MemoryCoalescing from '@/components/exploringattnres/MemoryCoalescing';
import ResidualComparison from '@/components/exploringattnres/ResidualComparison';
import TrainingChart from '@/components/exploringattnres/TrainingChart';

export const metadata: Metadata = {
  title: 'Exploring Attention Residuals | Evan Lin',
  description:
    'Naively reimplementing a paper in PyTorch changed how I think about how transformers route information, and about the gap between academic math and physical silicon.',
  openGraph: {
    title: 'What I Learned Building Attention Residuals from Scratch',
    description:
      'Naively reimplementing a paper in PyTorch changed how I think about how transformers route information, and about the gap between academic math and physical silicon.',
    type: 'article',
    url: '/writing/exploring-attnres',
    images: [
      {
        url: '/attnrestumbnail.png',
        width: 1789,
        height: 959,
        alt: 'Thumbnail for What I Learned Building Attention Residuals from Scratch.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What I Learned Building Attention Residuals from Scratch',
    description:
      'Naively reimplementing a paper in PyTorch changed how I think about how transformers route information, and about the gap between academic math and physical silicon.',
    images: ['/attnrestumbnail.png'],
  },
};

export default function ExploringAttentionResidualsPage() {
  return (
    <main className="attnres-shell text-stone-800 antialiased">
      <header className="px-6 pb-6 pt-2 md:pt-10">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 font-mono text-sm uppercase tracking-wide text-red-900">
            EXPLORATIONS - April 2026
          </p>
          <h1 className="mb-8 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-stone-900 sm:text-5xl">
            What I Learned Building Attention Residuals from Scratch
          </h1>
          <p className="mb-10 font-serif text-xl italic leading-relaxed text-stone-500">
            Naively reimplementing a paper in PyTorch changed how I think
            about how transformers route information, and about the gap between
            academic math and physical silicon.
          </p>
          <div className="border-b border-stone-200" />
        </div>
      </header>

      <article className="px-6 pb-24">
        <div className="attnres-blog-prose mx-auto max-w-2xl">
          <p>
            I wanted to understand how transformers actually route information
            between layers. Not at the level of &ldquo;attention computes
            weighted averages,&rdquo; but at the level of what physically
            happens to a tensor as it moves through the network. What gets
            preserved, what gets overwritten, and why.
          </p>
          <p>
            <a
              href="https://www.youtube.com/watch?v=LSHTkbnmzy4"
              target="_blank"
              rel="noopener noreferrer"
            >
              A video
            </a>{' '}
            helped build some of the initial intuition. From there I picked up
            the paper, <strong>Attention Residuals</strong>{' '}
            <em>(Kimi Team, 2026)</em>, and decided to reimplement it from
            scratch. No HuggingFace, no pre-built transformer blocks. Just{' '}
            <code>torch.einsum</code>, <code>nn.Parameter</code>, and a toy
            dataset small enough that I could trace every matrix multiplication
            by hand.
          </p>
          <figure className="my-10">
            <Image
              src="/attnres-lol-rotated.png"
              alt="A rotated sketch snapshot from the attention residuals article work-in-progress"
              width={2231}
              height={1751}
              className="w-full rounded-lg border border-stone-200"
            />
            <figcaption className="attnres-figure-caption">
              This is a frozen snapshot of when things started to click for me.
              I never finished the drawing, and my handwriting here might
              honestly be worse than{' '}
              <a
                href="https://x.com/kennykgguo/status/2040111742840111253"
                target="_blank"
                rel="noopener noreferrer"
              >
                kenny&apos;s
              </a>
              , but I like it as a raw artifact of the moment when the math
              started to feel concrete :p
            </figcaption>
          </figure>
          <p>
            Right around here, I remember asking Gemini, &ldquo;make me a toy
            problem that i can do by hand, faithful to the math in the
            paper.&rdquo; I needed something small enough that I could trace
            every tensor manually, but still honest to the actual routing
            mechanism the paper was studying.
          </p>
          <p>
            One thing that clicked for me from the video was that ordinary
            attention, plus the KV cache, is basically a breadth-wise memory.
            You keep appending keys and values along sequence length so the
            model can revisit earlier positions in time. Attention Residuals
            felt like that same instinct turned depth-wise. Instead of caching
            over previous tokens, you are effectively caching over previous
            layers and intermediate computations.
          </p>
          <p>
            Later,{' '}
            <a
              href="https://xanderchin.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Xander
            </a>{' '}
            sent me{' '}
            <a
              href="https://x.com/kimi_moonshot/status/2037010118957817988?s=46"
              target="_blank"
              rel="noopener noreferrer"
            >
              this Kimi tweet
            </a>
            , with two lines I loved: &ldquo;Rotating an LSTM gives us
            residuals&rdquo; and &ldquo;What is attention rotated by 90
            degrees?&rdquo; That framing made the whole thing feel especially
            beautiful to me. It was old machinery getting turned on a new axis,
            not discarded, just repurposed for a new problem.
          </p>
          <p>
            The exercise turned out to be far more instructive than I expected.
            Not because the paper is complex. The core idea literally fits in a
            paragraph. But implementing it forced me to confront questions
            about memory management, gradient flow, and hardware constraints
            that never come up when you&apos;re working at the API level.
          </p>
          <p>
            This post walks through the architecture, some code, and the
            specific moments where my understanding broke and reformed.
          </p>

          <hr />

          <h2>The problem with standard residuals</h2>
          <p>
            A standard transformer block computes <code>x = x + layer(x)</code>
            . The residual connection is one of the most important ideas in
            deep learning. It gives gradients a direct path through the network
            and prevents the &ldquo;vanishing gradient&rdquo; problem from
            killing training.
          </p>
          <p>
            But there&apos;s a subtle limitation. Each layer can only see the
            output of the layer immediately before it. Layer 12 cannot directly
            read the raw embedding. Layer 8 cannot inspect what Layer 2
            computed. Information propagates through a chain of additions, like
            a game of telephone, and by the time a signal reaches the deeper
            layers, it has been mixed, transformed, and potentially diluted
            beyond recognition.
          </p>
          <p>
            The residual stream helps, because the original signal is
            additively preserved. But the <em>relative contribution </em> of
            early layers shrinks as more terms get summed in. There&apos;s no
            mechanism for a later layer to say: &ldquo;I specifically need 80%
            of the embedding and only 5% of Layer 3.&rdquo;
          </p>
          <p>
            Attention Residuals replaces this fixed plumbing with a{' '}
            <strong>learned routing mechanism</strong>. Every layer gets to
            decide, for itself, exactly how much of each previous output to
            use.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <ResidualComparison />
        </div>

        <div className="attnres-blog-prose mx-auto max-w-2xl">
          <h2>A growing database of past outputs</h2>
          <p>
            The first data structure I had to build was what I started calling
            the &ldquo;history database.&rdquo; Instead of passing a single
            tensor forward through the network, I maintain a Python list of
            every output generated so far:
          </p>
          <CodeBlock
            code={`states = [x]  # start with the embedding

for layer in self.layers:
    states = layer(states)  # the layer reads AND appends

return self.final_proj(states[-1])`}
          />
          <p>
            Each <code>FullAttnResLayer</code> receives this list, reads from
            it to construct its inputs, and appends its own MHA and MLP outputs
            before passing the updated list to the next layer. The database
            grows by two entries per layer, one from the multi-head attention
            block, one from the MLP.
          </p>
          <p>
            One dumb thing I thought should work at first was{' '}
            <code>states.append(layer(states))</code>. It sounds natural when
            you say it fast. But <code>layer(states)</code> already mutates and
            returns the same list object, so that line would make{' '}
            <code>states</code> append itself into itself. Layer 2&apos;s{' '}
            <code>torch.stack()</code> would then immediately walk into a
            cursed self-referential list and explode.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <DatabaseGrowth />
        </div>

        <div className="attnres-blog-prose mx-auto max-w-2xl">
          <p>
            A subtle but important implementation detail: the list itself only
            stores pointers. When you call{' '}
            <code>previous_states.append(mha_out)</code>, Python doesn&apos;t
            copy the tensor. It just jots down the memory address. This is
            essentially free. The expensive operation comes later, when we need
            to do math across all entries and must call{' '}
            <code>torch.stack()</code> to flatten the scattered pointers into a
            single, contiguous 4D tensor that the GPU can parallelize over.
          </p>

          <h2>The alpha gate: learned routing</h2>
          <p>
            Before each MHA or MLP block runs, a small routing engine decides
            how to blend the history. I call this the <strong>alpha gate</strong>.
            It computes a set of learned, softmax-normalized percentages (the
            &alpha; weights) that determine how much of each past output to
            include.
          </p>
          <p>The mechanism is a strict 4-step pipeline:</p>
          <ol>
            <li>
              <strong>RMSNorm.</strong> Normalize the stacked history tensor to
              ensure fair scoring across entries that may live at different
              scales.
            </li>
            <li>
              <strong>Score.</strong> Dot-product a learned 1D query vector (
              <em>w</em>
              <sub>l</sub>) against the normalized history. This produces one
              raw logit per history entry.
            </li>
            <li>
              <strong>Softmax.</strong> Convert the logits into percentages
              that sum to 1.0 along the depth dimension. These are the alpha
              gates.
            </li>
            <li>
              <strong>Blend.</strong> Weighted sum of the{' '}
              <em>raw, un-normalized</em> history using the alpha percentages.
              This becomes the input to the next sublayer.
            </li>
          </ol>
        </div>

        <div className="mx-auto max-w-4xl">
          <AlphaGatePipeline />
        </div>

        <div className="attnres-blog-prose mx-auto max-w-2xl">
          <p>Here is the actual implementation:</p>
          <CodeBlock
            code={`def alpha_gating(self, history, layer_type):
    normed_history = (
        self.mlp_res_norm(history)
        if layer_type == "mlp"
        else self.mha_res_norm(history)
    )
    pre_scores = torch.einsum(
        "d, s b t d -> s b t",
        self.mlp_query if layer_type == "mlp" else self.mha_query,
        normed_history,
    )
    scores = F.softmax(pre_scores, dim=0)
    return torch.einsum(
        "s b t, s b t d -> b t d",
        scores,
        history,  # raw history, not the normed version
    )`}
          />
          <p>
            Two things worth noting. First, the query vector is initialized to
            all zeros via <code>nn.Parameter(torch.zeros(D))</code>. At the
            start of training, every alpha gate produces a uniform distribution
            over the history, roughly equal weight to all past entries, and
            then learns to specialize. Second, the blend step operates on the
            <em> raw </em> history, not the normalized version. The RMSNorm
            exists purely to stabilize the scoring. We don&apos;t want to feed
            the sublayer a signal that has been normalized twice.
          </p>

          <h3>A note on the &ldquo;useless&rdquo; first query</h3>
          <p>
            MHA 1 is the first module to run. At that point, the database
            contains exactly one entry: the embedding. The alpha gate computes
            softmax over a single element, which is always <code>[1.0]</code>.
            The first query vector is mathematically locked. Its gradients will
            always be zero, and it will never learn anything. It exists in the
            code purely for structural symmetry.
          </p>
          <p>
            I only understood this after making a very silly mistake on paper.
            I had written down the alpha gate from embedding to MHA 1 as
            something like <code>[1, 1]</code>, because in my head I was
            already counting both the embedding and MHA 1. But MHA 1
            hasn&apos;t run yet when it queries the database. There is only
            one thing to attend to. That was the moment it clicked that the
            first query vector isn&apos;t just unimportant, it is
            mathematically useless.
          </p>

          <h2>The dual-norm system</h2>
          <p>
            One of the more confusing aspects of the implementation was keeping
            track of the normalization layers. There are <em>two</em>{' '}
            completely independent sets of <code>nn.RMSNorm</code> modules per
            layer, and they serve entirely different purposes:
          </p>
          <ul>
            <li>
              <strong>Routing norms</strong> (<code>mha_res_norm</code>,{' '}
              <code>mlp_res_norm</code>). These live inside the alpha gate.
              They normalize the entire history stack to stabilize the scoring
              mechanism.
            </li>
            <li>
              <strong>Pre-norms</strong> (<code>mha_input_norm</code>,{' '}
              <code>mlp_input_norm</code>). These live outside the alpha gate.
              They normalize the single blended vector right before it enters
              the heavy weight matrices of MHA or MLP, preventing gradient
              explosion.
            </li>
          </ul>
          <p>
            Critically, the routing norms and pre-norms must be separate
            modules. If MHA and MLP share a single norm, they are forced to
            evaluate the history with the same learned scale, which cripples
            their ability to develop distinct routing strategies.
          </p>
          <CodeBlock
            code={`# Each sublayer gets its own routing norm AND its own pre-norm
self.mha_res_norm   = nn.RMSNorm(D)  # for scoring
self.mha_input_norm = nn.RMSNorm(D)  # for stabilizing
self.mlp_res_norm   = nn.RMSNorm(D)
self.mlp_input_norm = nn.RMSNorm(D)`}
          />

          <h2>The complete forward pass</h2>
          <p>
            Each layer executes two sequential phases. MHA runs first, appends
            its output to the database, and then MLP runs with the newly
            updated database, meaning the MLP can immediately use the current
            layer&apos;s MHA output as an ingredient.
          </p>
          <CodeBlock
            code={`def forward_attn_res(self, previous_states):
    # Phase 1: MHA
    V = torch.stack(previous_states)
    gated_input = self.alpha_gating(V, "mha")
    mha_out = self.mha(self.mha_input_norm(gated_input))
    previous_states.append(mha_out)

    # Phase 2: MLP
    V_updated = torch.stack(previous_states)
    gated_input = self.alpha_gating(V_updated, "mlp")
    mlp_out = self.transform(self.mlp_input_norm(gated_input))
    previous_states.append(mlp_out)

    return previous_states`}
          />
          <p>
            Notice the two calls to <code>torch.stack</code>. The first stacks{' '}
            <em>N</em> entries; the second stacks <em>N+1</em>. Each call
            allocates a brand-new contiguous block of GPU memory, copies every
            tensor from the scattered Python list into it, and hands the result
            to <code>einsum</code>. This is expensive, but necessary. GPU
            tensor cores cannot operate on a Python list of pointers. They need
            a single, aligned memory block.
          </p>
          <p>
            I also had a moment where the two variable names, <code>V</code>{' '}
            and <code>V_updated</code>, felt hella memory inefficient. Like,
            wait, did I just double memory by naming the thing twice? But the
            names are free. They&apos;re just sticky notes attached to GPU
            allocations. The real memory cost is the new <code>torch.stack()</code>{' '}
            call itself, which allocates fresh contiguous storage no matter
            what you name the result.
          </p>

          <hr />

          <h2>What the numbers showed</h2>
          <p>
            I trained two identical architectures, 4 layers, hidden size 16, 4
            attention heads, on a synthetic sequence-reversal task. The only
            difference: one uses attention residuals, the other uses standard{' '}
            <code>x = x + layer(x)</code> skip connections. Both use sinusoidal
            positional encodings, MSE loss, and the Adam optimizer at a
            learning rate of 0.005 over 50 epochs.
          </p>
          <p>
            I hooked into the weight gradient of the first Linear layer in
            Layer 1&apos;s MLP to monitor how well gradients propagate from the
            output all the way back to the earliest parameters.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <TrainingChart />
        </div>

        <div className="attnres-blog-prose mx-auto max-w-2xl">
          <p>Two results stand out:</p>
          <p>
            <strong>Lower final loss.</strong> Attention Residuals reaches a
            loss of 0.830 versus 0.865 for the standard baseline, a meaningful
            gap on a toy task where both models have identical parameter counts.
          </p>
          <p>
            <strong>Gradient growth vs. plateau.</strong> This is the more
            interesting finding. With attention residuals, the average gradient
            magnitude in Layer 1 grows roughly 11&times; over training (from
            0.000107 to 0.001230). With standard residuals, gradients start
            higher but quickly plateau around 0.00095, showing only ~1.8&times;
            growth.
          </p>
          <p>
            The interpretation is straightforward: the alpha gates create
            direct gradient highways from the loss back to early layers.
            Instead of gradients having to flow through every intermediate
            computation, they can propagate directly through the
            softmax-weighted connections. This is the same principle that made
            DenseNet work in computer vision. Direct connections beat chains.
          </p>

          <hr />

          <h2>The deeper lessons</h2>
          <p>
            The architecture itself is simple. The real education was in the
            implementation details, the places where abstract math collides
            with physical hardware constraints.
          </p>
          <p>
            I also felt like I got to understand PyTorch a little better
            through all of this. Part of why I even started the project was a
            conversation{' '}
            <a
              href="https://www.suryasure.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Surya
            </a>{' '}
            had with Zachary Cetinic, which was the initial spark for all of this.
            That made me want to give it a shot myself and hand-write most of
            the machinery and repetitive plumbing, just to see if I could make
            the abstractions feel concrete.
          </p>

          <h3>
            <code>torch.stack</code> vs. <code>.append</code>
          </h3>
          <p>
            Python lists and PyTorch tensors occupy fundamentally different
            worlds. When you <code>.append()</code> a tensor to a list, Python
            just writes down a memory address. Essentially free, O(1), no data
            movement. When you <code>torch.stack()</code> that list into a
            tensor, PyTorch must find a contiguous block of GPU memory large
            enough to hold every entry, then physically copy all the data into
            it.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <MemoryCoalescing />
        </div>

        <div className="attnres-blog-prose mx-auto max-w-2xl">
          <p>
            This means every layer pays the cost of two full stack operations.
            It felt wasteful at first. But there&apos;s no alternative.{' '}
            <code>einsum</code> is a C++/CUDA kernel that requires perfectly
            aligned memory. You cannot run a matrix multiplication on a Python
            list of scattered pointers. The cost is the price of parallelism.
          </p>
          <p>
            I originally thought maybe skipping <code>torch.stack()</code>{' '}
            would just make <code>einsum</code> slower. It wouldn&apos;t be
            slower. It would just crash. <code>einsum</code> has no idea what a
            Python list even is. It wants contiguous tensor memory or nothing.
          </p>

          <h3>Pass-by-reference saves you</h3>
          <p>
            When a layer receives <code>previous_states</code> and appends to
            it, it is mutating the list in place. Python lists are passed by
            reference. The function receives a pointer to the same object, not
            a copy. The outer training loop&apos;s <code>states</code> variable
            sees the mutations automatically. Writing{' '}
            <code>states = layer(states)</code> looks like it&apos;s
            &ldquo;rewriting&rdquo; the list, but under the hood it&apos;s just
            moving a name tag from one pointer to the same pointer. Zero data
            movement.
          </p>

          <h3>Softmax is stateless; norms are stateful</h3>
          <p>
            A pattern that clarified the PyTorch programming model for me:
            operations that have <em>no</em> learned parameters (softmax, GELU,
            einsum) live in <code>torch.nn.functional</code> and are called in{' '}
            <code>forward()</code>. Operations that <em>do</em> have learned
            parameters (RMSNorm, Linear) must be instantiated in{' '}
            <code>__init__</code> so that <code>nn.Parameter</code> can tell
            PyTorch&apos;s memory allocator to permanently reserve space for
            their weights and register them with the autograd engine.
          </p>

          <h3>The connection to hardware</h3>
          <p>
            This little exploration reshaped how I think about the boundary between
            algorithms and silicon. The alpha gate is a beautiful mathematical
            idea, learned softmax routing over a depth history. But making it
            run fast on a GPU requires understanding that{' '}
            <code>torch.stack</code> is not free, that <code>einsum</code>{' '}
            needs contiguous memory, and that the real bottleneck in modern AI
            hardware is not compute but <em>memory bandwidth</em>, how fast you
            can ferry data between slow HBM and fast SRAM.
          </p>
          <p>
            The same principle underlies FlashAttention, which doesn&apos;t
            change the math of attention at all but rewrites the memory access
            pattern to avoid materializing the <em>T&times;T</em> score matrix
            in HBM. It trades slightly more compute for vastly less memory I/O,
            because on modern GPUs, computing a number twice is often faster
            than memorizing it once.
          </p>
          <p>
            Another thing I got weirdly stuck on for a while was softmax. I
            kept thinking, okay, other words live across the columns, so how
            are rows somehow independent? The unlock was realizing that walking
            across one row <em>is</em> scanning the columns. That was the thing
            that finally made attention feel embarrassingly parallel to me, and
            that is basically the whole intuition underneath why FlashAttention
            works at all.
          </p>
          <p>
            I also briefly made the classic bad leap of, &ldquo;oh, if each row
            is parallelizable then attention is O(N).&rdquo; Not true. The
            total work is still O(N²). Parallelism only changes how much of
            that work you can hide across cores, not the exponent. I think
            part of why I got mixed up is that I already had this fuzzy fact
            in my head that some attention memory stories grow like O(N) while
            compute grows like O(N²), and I probably blurred that together
            with the parallelism story along the way.
          </p>

          <h2>How my toy results compare with the paper</h2>
          <p>
            The Kimi Team trained AttnRes on a 48B-parameter MoE Transformer
            with 1.4 trillion tokens of real text. I trained a 4-layer model
            with D=16 on 5,000 synthetic sequences for 50 epochs. The raw loss
            numbers are not comparable at all:
          </p>

          <div className="my-8 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="py-2 pr-4 text-left font-semibold text-stone-900"></th>
                  <th className="py-2 pr-4 text-left font-semibold text-stone-900">
                    My experiment
                  </th>
                  <th className="py-2 text-left font-semibold text-stone-900">
                    Paper
                  </th>
                </tr>
              </thead>
              <tbody className="text-stone-700">
                <tr className="border-b border-stone-200">
                  <td className="py-2 pr-4 font-medium text-stone-800">
                    Loss function
                  </td>
                  <td className="py-2 pr-4">MSE</td>
                  <td className="py-2">Cross-entropy</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <td className="py-2 pr-4 font-medium text-stone-800">Task</td>
                  <td className="py-2 pr-4">Sequence reversal (synthetic)</td>
                  <td className="py-2">Language modeling (1.4T tokens)</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <td className="py-2 pr-4 font-medium text-stone-800">Model</td>
                  <td className="py-2 pr-4">4 layers, D=16, ~few K params</td>
                  <td className="py-2">48B total / 3B active, 54 layers</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-stone-800">
                    Loss range
                  </td>
                  <td className="py-2 pr-4">0.83 &ndash; 1.00</td>
                  <td className="py-2">1.15 &ndash; 1.93</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            MSE and cross-entropy live on completely different scales with
            different theoretical minimums. An MSE of 0.83 and a
            cross-entropy of 1.69 are not comparable quantities.
          </p>
          <p>But the <em>relative behavior</em> tells the same story.</p>
          <p>
            <strong>AttnRes consistently beats the baseline.</strong> The paper
            sees ~1.5% lower validation loss at the 528M scale (1.692 vs.
            1.719). I see ~4% lower loss (0.830 vs. 0.865). The larger
            relative gap in my experiment makes sense: a tiny model is more
            capacity-constrained, so routing efficiency matters more per
            parameter.
          </p>
          <figure className="my-10">
            <Image
              src="/attnres-stats.png"
              alt="Statistics comparison image from the original attention residuals article"
              width={1310}
              height={676}
              className="w-full rounded-lg border border-stone-200"
            />
          </figure>
          <p>
            <strong>Gradient distribution is the big one. </strong> Figure 5(c)
            in the paper shows the baseline produces disproportionately large
            gradients in early layers with no mechanism to regulate flow across
            depth. AttnRes yields a substantially more uniform gradient
            distribution. My Layer 1 gradient hook shows exactly this: AttnRes
            gradients grow 11&times; over training while standard residuals
            plateau at ~1.8&times; growth. The alpha gates are creating direct
            gradient highways, just like the paper claims.
          </p>
          <p>
            <strong>PreNorm dilution.</strong> Figure 5(b) in the paper shows
            baseline output magnitudes growing monotonically with depth. Deeper
            layers learn increasingly large outputs to stay influential over the
            accumulated residual. AttnRes bounds this growth. I did not measure
            output magnitudes directly, but the improved gradient flow I
            observed is a downstream consequence of the same mechanism.
          </p>
          <p>
            So a toy experiment at D=16 with 50 epochs on synthetic data
            independently reproduced the paper&apos;s core finding: learned
            softmax routing fixes gradient distribution across depth. The loss
            numbers are apples-to-oranges, but the dynamics are the same.
          </p>

          <hr />

          <h2>Why building from scratch matters</h2>
          <p>
            You can read a paper and nod along at the equations. You can import
            a library and watch the loss go down. But neither of those
            experiences will teach you that <code>torch.stack</code> allocates
            new memory, that Python lists are passed by reference, or that the
            first alpha gate in the network is mathematically useless.
          </p>
          <p>
            Those are the kinds of details that matter when you&apos;re
            debugging a training run at 3 AM, or designing a custom hardware
            accelerator, or trying to invent the next architecture. I think the gap
            between &ldquo;I understand the math&rdquo; and &ldquo;I understand
            the plumbing&rdquo; is where engineering lives.
          </p>
          <p>
            The full implementation is comprised of hacky PyTorch plumbing with a
            bunch of stream-of-consciousness comments/notes that helped me
            carefully comb through my thoughts, but probably won&apos;t be
            important to you. 
          </p>
          <h2>Hindsight</h2>
          <p>
            If I kept pushing this further, the next things I&apos;d want to
            try are:
          </p>
          <ul>
            <li>Implement Block AttnRes.</li>
            <li>Change MHA to GQA.</li>
            <li>Train it for more than 50 epochs lol.</li>
            <li>Use a more modern optimizer.</li>
            <li>
              Replace the sinusoidal embeddings with RoPE. I skipped that this
              time because I didn&apos;t really understand RoPE well enough yet
              to feel good implementing it.
            </li>
            <li>
              Switch from encoder layers to decoder layers and add a KV cache.
            </li>
          </ul>
          <p>
            And before anybody polices me about &ldquo;tHiS iSnT hOw yOu dO
            rEsEaRcH,&rdquo; well, 1. I&apos;m not a researcher, 2. I know
            very little about training, and 3. if you&apos;ve made it this far,
            give me tips on how i could do better :)
          </p>

          <hr />

          <p className="mt-12 text-base text-stone-500">
            <em>
              The paper is{' '}
              <strong>Attention Residuals</strong> <em>(Kimi Team, 2026)</em>,
              <a
                href="https://arxiv.org/abs/2603.15031"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                arXiv:2603.15031
              </a>
              .
            </em>
          </p>
          <p className="text-base text-stone-500">
            Full code and some training logs in the{' '}
            <a
              href="https://github.com/eevaain/toy-attention-residuals"
              target="_blank"
              rel="noopener noreferrer"
            >
              repository
            </a>
          </p>
        </div>
      </article>
    </main>
  );
}
