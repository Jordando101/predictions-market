import type { Category, ConfidenceLevel, JudgeOutput, Market, RedTeamOutput, ResearchOutput } from '../types';

const ARTICLES_BY_CATEGORY: Record<Category, ResearchOutput['articles']> = {
  Politics: [
    {
      title: 'FiveThirtyEight 2026 Forecast: Competitive Political Map',
      url: 'https://fivethirtyeight.com/features/2026-forecast',
      snippet: 'Historical base rates and current polling averages suggest a genuinely contested outcome with several states within the margin of error...',
      publishedAt: '2026-09-15',
      relevanceScore: 0.93,
    },
    {
      title: 'Cook Political Report: Cycle Ratings Update',
      url: 'https://cookpolitical.com/ratings-2026',
      snippet: 'Multiple races have shifted in recent weeks as economic indicators and approval ratings influence voter sentiment...',
      publishedAt: '2026-09-22',
      relevanceScore: 0.88,
    },
    {
      title: 'Historical Patterns in Midterm Election Outcomes',
      url: 'https://realclearpolitics.com/historical-midterms-analysis',
      snippet: 'Since 1946, the president\'s party has gained seats in only two midterm cycles, underscoring the structural headwinds incumbents typically face...',
      publishedAt: '2026-08-10',
      relevanceScore: 0.79,
    },
    {
      title: 'Expert Roundtable: Forecasting Models for 2026',
      url: 'https://sabato.virginia.edu/2026-roundtable',
      snippet: 'Ensemble of 6 forecasting models shows a distribution skewed toward the challenging side for the incumbent party, though high uncertainty remains...',
      publishedAt: '2026-09-28',
      relevanceScore: 0.85,
    },
  ],
  Economics: [
    {
      title: 'Federal Reserve Meeting Minutes — September 2026',
      url: 'https://federalreserve.gov/monetarypolicy/fomcminutes2026',
      snippet: 'Committee members expressed divergent views on the pace of rate normalization, with hawks citing persistent core services inflation above 3.1%...',
      publishedAt: '2026-09-18',
      relevanceScore: 0.96,
    },
    {
      title: 'Goldman Sachs: Macro Outlook Q4 2026',
      url: 'https://gs.com/research/macro-q4-2026',
      snippet: 'GS economists assign 72% probability to at least one cut before year-end, citing softening labor market data and falling breakeven rates...',
      publishedAt: '2026-09-25',
      relevanceScore: 0.91,
    },
    {
      title: 'CME FedWatch Tool: Market-Implied Path Analysis',
      url: 'https://cmegroup.com/trading/interest-rates/fed-funds',
      snippet: 'Fed funds futures currently price a 61% probability of a 25bp cut at the December FOMC meeting, up from 48% six weeks ago...',
      publishedAt: '2026-10-01',
      relevanceScore: 0.89,
    },
    {
      title: 'JP Morgan: Inflation Trajectory and Fed Response',
      url: 'https://jpmorgan.com/research/inflation-2026',
      snippet: 'CPI prints for August and September have come in below consensus estimates, strengthening the case for an easing pivot before year-end...',
      publishedAt: '2026-09-30',
      relevanceScore: 0.84,
    },
  ],
  Sports: [
    {
      title: 'Elo Ratings & Super Bowl Odds: Pre-Season Assessment',
      url: 'https://fivethirtyeight.com/features/nfl-elo-ratings-2026',
      snippet: 'Advanced metrics favor contenders with defensive efficiency advantages, but the 32-team field and single-elimination format introduces high variance...',
      publishedAt: '2026-09-10',
      relevanceScore: 0.88,
    },
    {
      title: 'Injury Report Analysis: Impact on Championship Odds',
      url: 'https://theathletic.com/nfl-injury-impact-2026',
      snippet: 'Key offensive skill positions show elevated injury risk in early weeks; teams with depth at QB and WR historically outperform in playoff runs...',
      publishedAt: '2026-10-02',
      relevanceScore: 0.82,
    },
    {
      title: 'Historical SB Winner Base Rates by Conference & Seeding',
      url: 'https://pro-football-reference.com/sb-historical',
      snippet: 'AFC teams have won 8 of the last 13 Super Bowls; #1 and #2 seeds account for 70% of champions over the same period...',
      publishedAt: '2026-07-15',
      relevanceScore: 0.76,
    },
  ],
  Tech: [
    {
      title: 'OpenAI Product Roadmap Signals: Developer Conference Analysis',
      url: 'https://techcrunch.com/openai-roadmap-signals-2026',
      snippet: 'Internal code references and API schema changes suggest a major model family release is in staging, with developer access expected ahead of consumer launch...',
      publishedAt: '2026-09-20',
      relevanceScore: 0.91,
    },
    {
      title: 'AI Model Release Cadence: Benchmarking Industry Patterns',
      url: 'https://aiindex.stanford.edu/release-cadence-2026',
      snippet: 'Major labs have accelerated release cadences since 2024; average time between frontier model generations has compressed from 18 to 9 months...',
      publishedAt: '2026-08-30',
      relevanceScore: 0.85,
    },
    {
      title: 'Compute Procurement Data: Signals for Next-Gen Model Training',
      url: 'https://semianalysis.com/compute-procurement-2026',
      snippet: 'H200 and GB200 cluster utilization data from hyperscalers shows training run patterns consistent with a large-scale frontier model completing by Q3 2026...',
      publishedAt: '2026-09-12',
      relevanceScore: 0.88,
    },
    {
      title: 'Regulatory Timeline: EU AI Act Enforcement and Model Launches',
      url: 'https://techpolicy.eu/ai-act-enforcement-2026',
      snippet: 'EU AI Act enforcement deadlines create compliance pressure for frontier model releases; labs may strategically time launches relative to regulatory milestones...',
      publishedAt: '2026-09-05',
      relevanceScore: 0.71,
    },
  ],
  Other: [
    {
      title: 'Kalshi Market Analysis: Contract Specification Deep Dive',
      url: 'https://kalshi.com/market-analysis',
      snippet: 'Resolution criteria, counterparty risk, and liquidity metrics are key factors in accurate probability assessment for this contract type...',
      publishedAt: '2026-09-01',
      relevanceScore: 0.80,
    },
    {
      title: 'Prediction Market Accuracy: Historical Calibration Study',
      url: 'https://predictionmarket-research.org/calibration-2026',
      snippet: 'Well-traded prediction markets show strong calibration between 30-70% probability ranges, with more variance at the tails...',
      publishedAt: '2026-08-15',
      relevanceScore: 0.74,
    },
    {
      title: 'Base Rate Analysis for Novel Event Categories',
      url: 'https://forecasting.wiki/base-rates',
      snippet: 'Reference class forecasting suggests anchoring initial estimates to historical frequencies of similar events before updating on case-specific evidence...',
      publishedAt: '2026-07-20',
      relevanceScore: 0.70,
    },
  ],
};

const BULL_BEAR_BY_CATEGORY: Record<Category, { bull: string; bear: string; summary: string }> = {
  Politics: {
    bull: 'Strong candidate recruitment, favorable turnout models in urban centers, and a structural advantage in key demographic trends suggest this outcome is more likely than markets currently reflect. Historical cycles with similar conditions have favored this result at higher rates than the current implied probability.',
    bear: 'Structural headwinds from historical midterm patterns, challenging map dynamics, and current approval ratings create meaningful downside risk. The distribution of competitive seats and funding gaps in critical states compound these concerns.',
    summary: 'This political market reflects genuine uncertainty, with historical base rates and current polling both providing relevant signal. The key uncertainty is in the tails — whether enthusiasm and turnout patterns break toward historical norms or deviate materially.',
  },
  Economics: {
    bull: 'Softening labor market indicators, declining core inflation prints, and explicit Fed communication shifts signal increasing willingness to ease. Financial conditions have tightened beyond the Fed\'s stated comfort zone, creating both the need and the cover for a cut.',
    bear: 'Persistent services inflation, strong wage growth, and a still-above-target PCE deflator give hawkish committee members grounds to delay. Fed credibility concerns following the 2021-22 inflation overshoot create asymmetric risk of over-caution.',
    summary: 'The market is pricing meaningful probability of a cut, but our analysis suggests the conditional probability of easing given recent data trends is materially higher than market implied. The key risk is a single hot inflation print disrupting the narrative.',
  },
  Sports: {
    bull: 'Betting markets and advanced metrics converge on identifying this team as one of the strongest contenders. Roster construction, coaching continuity, and minimal injury exposure entering the playoffs support an above-consensus probability.',
    bear: 'The 32-team single-elimination format introduces substantial variance regardless of team quality. A 20% win probability in each playoff game compounds to roughly a 10% championship probability even for the best team. Current implied odds may overstate predictability.',
    summary: 'Sports championship markets are inherently high-variance. Our analysis focuses on identifying systematic mispricing relative to power ratings rather than directional conviction. Small edges are worth flagging but position sizing should reflect the variance.',
  },
  Tech: {
    bull: 'Developer community signals, compute procurement data, and competitive dynamics from rival labs create strong pressure to launch within the target window. Internal timeline disclosures from conference presentations and job postings corroborate an imminent release.',
    bear: 'Tech product timelines are notoriously susceptible to slippage, particularly for safety-sensitive AI systems. Regulatory review processes, red-teaming requirements, and enterprise customer deployment needs can all delay public availability beyond internal milestones.',
    summary: 'The tech market shows meaningful information asymmetry — public signals from the developer community and compute data suggest higher probability than market pricing, but the tail risk of timeline slippage and regulatory delay needs to be weighted carefully.',
  },
  Other: {
    bull: 'Available evidence and base rates for similar events support a higher probability than currently priced. Key leading indicators and domain expert consensus align with the bullish thesis.',
    bear: 'Uncertainty about resolution criteria edge cases, limited liquidity, and information asymmetry between market makers and general participants may be suppressing accurate probability discovery.',
    summary: 'This market requires careful reading of the exact resolution criteria before committing to a probability. The current pricing may reflect limited market depth rather than an efficient consensus estimate.',
  },
};

const REDTEAM_BY_CATEGORY: Record<Category, RedTeamOutput> = {
  Politics: {
    critiques: [
      { point: 'Polling averages may suffer from systematic herding bias — models trained on post-2016 corrections may over-adjust, understating uncertainty.', severity: 'medium' },
      { point: 'Turnout modeling is particularly fragile this cycle given novel mobilization patterns; historical turnout models may be poor predictors.', severity: 'high' },
      { point: 'The research relies heavily on aggregators rather than primary polling sources; methodological diversity is lower than it appears.', severity: 'low' },
    ],
    biasFlags: [
      'Recency bias toward most recent polling without weighting fundamentals-based models',
      'Narrative anchoring on a single dominant political story may miss cross-cutting issues',
    ],
    alternativeInterpretations: [
      'Late-breaking campaign events could shift outcomes by 3-5 points, which is material given current margin estimates.',
      'Differential enthusiasm between base voters and occasional voters may not be captured in likely voter screens.',
    ],
    overallAssessment: 'The research provides a reasonable foundation but over-indexes on polling-based forecasts. The core probability estimate should be modestly widened to account for model uncertainty and turnout variance.',
  },
  Economics: {
    critiques: [
      { point: 'CME FedWatch implied probabilities embed risk premiums and hedging behavior; they should not be read as pure probability assessments.', severity: 'high' },
      { point: 'Research bank forecasts are subject to institutional incentives; independent academic economists show more dispersion than the cited estimates suggest.', severity: 'medium' },
      { point: 'The research underweights geopolitical shock scenarios that could reverse the inflation trajectory before December.', severity: 'medium' },
    ],
    biasFlags: [
      'Overweighting recent soft inflation prints relative to stickier underlying series',
      'Fed officials\' public statements may be strategic communications rather than honest probability estimates',
    ],
    alternativeInterpretations: [
      'A resurgence in energy prices tied to geopolitical events could force the Fed to pause or reverse guidance between now and December.',
      'Strong Q3 GDP growth could reframe the macro narrative away from easing necessity even if inflation data is benign.',
    ],
    overallAssessment: 'The bullish case for a cut is stronger than the research acknowledges — but the tail risks from a single disruptive macro event are not adequately priced. The probability estimate is directionally correct but slightly too confident.',
  },
  Sports: {
    critiques: [
      { point: 'Elo-based power ratings lag real-time injury and roster information; the edge may be stale.', severity: 'high' },
      { point: 'Single-elimination tournament outcomes are dominated by variance; even correct team rankings are poor predictors of championship outcomes.', severity: 'high' },
      { point: 'Weather and venue effects for outdoor playoff games are systematically underweighted in model-based forecasts.', severity: 'low' },
    ],
    biasFlags: [
      'Narrative bias toward well-known franchises — market reputation may not reflect current-cycle roster quality',
      'Recent performance recency bias — teams in form may be over-projected vs. regression to mean',
    ],
    alternativeInterpretations: [
      'A single key player injury in wildcard or divisional rounds would fundamentally alter the probability regardless of regular-season strength.',
      'Historical dynastic franchises tend to revert toward the mean in championship probability faster than market participants expect.',
    ],
    overallAssessment: 'Sports markets are high-variance by nature and the research correctly identifies the contenders. However, overconfidence in power-rating models is the primary risk. Championship probabilities for even the best teams rarely exceed 25-30% in a 32-team field.',
  },
  Tech: {
    critiques: [
      { point: 'Compute procurement data and API schema changes are circumstantial — they indicate training and preparation, not actual launch timelines.', severity: 'medium' },
      { point: 'Research understates how frequently internal milestone completions fail to translate to public launch within stated windows.', severity: 'high' },
      { point: 'The cited developer conference signals could reflect incremental model improvements rather than a major named release.', severity: 'medium' },
    ],
    biasFlags: [
      'AI product release coverage has historically skewed optimistic — anticipation exceeds execution timelines',
      'Availability bias from recent high-profile launches may make another launch feel more imminent than base rates suggest',
    ],
    alternativeInterpretations: [
      'Safety testing and red-teaming processes have lengthened considerably; the lab may have the capability but not yet the clearance to release.',
      'Competitive dynamics could cause a strategic delay rather than a rush to market if a rival\'s product announcement changes the landscape.',
    ],
    overallAssessment: 'The directional case for a release within the target window is plausible but the research is too anchored on bullish signals. Product timeline slippage in the AI space is frequent and should receive more weight in the calibrated probability.',
  },
  Other: {
    critiques: [
      { point: 'Resolution criteria ambiguity creates meaningful edge-case risk that could result in a different resolution than the research assumes.', severity: 'high' },
      { point: 'Limited comparable historical events make base rate anchoring unreliable; the reference class may be too broad.', severity: 'medium' },
      { point: 'Market liquidity and maker behavior suggest at least some probability that current pricing reflects strategic positioning rather than consensus.', severity: 'low' },
    ],
    biasFlags: [
      'Availability heuristic — memorable recent analogues may be over-indexed relative to the full reference class',
      'Conjunction fallacy risk if the resolution depends on multiple independent conditions all being met',
    ],
    alternativeInterpretations: [
      'The resolution timeline introduces compounding uncertainty that is absent from markets with clearer binary endpoints.',
      'Third-party determination of resolution could introduce interpretation variance not priced into current odds.',
    ],
    overallAssessment: 'The research provides a reasonable directional view but the uncertainty bands should be wider given the limited comparables and potential resolution ambiguity.',
  },
};

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function generateMockResearch(market: Market): ResearchOutput {
  const cat = market.category;
  const articles = ARTICLES_BY_CATEGORY[cat].slice(0, 3 + Math.round(Math.random()));
  const { bull, bear, summary } = BULL_BEAR_BY_CATEGORY[cat];
  return { articles, bullCase: bull, bearCase: bear, summary };
}

export function generateMockRedTeam(market: Market): RedTeamOutput {
  return REDTEAM_BY_CATEGORY[market.category];
}

export function generateMockJudge(market: Market): JudgeOutput {
  const target = market._mockTargetProbability;
  const raw = target !== undefined
    ? target
    : clamp(market.marketPrice + (Math.random() * 0.3 - 0.1), 0.05, 0.95);
  const probability = Math.round(raw * 100) / 100;

  const edge = probability - market.marketPrice;
  const absEdge = Math.abs(edge);
  const confidence: ConfidenceLevel = absEdge > 0.15 ? 'high' : absEdge > 0.07 ? 'medium' : 'low';

  const direction = edge > 0 ? 'above' : 'below';
  const edgePct = Math.round(Math.abs(edge) * 100);

  const KEY_FACTORS_BY_CATEGORY: Record<Category, string[]> = {
    Politics: [
      'Historical base rates for this type of outcome under comparable conditions',
      'Current polling averages adjusted for house effects and likely-voter model variance',
      'Structural map or demographic advantages/disadvantages',
      'Incumbent approval ratings and economic fundamentals as leading indicators',
    ],
    Economics: [
      'Fed dot plot and recent FOMC communication shifts',
      'Core PCE and CPI trend over trailing 3 months',
      'Market-implied path from fed funds futures',
      'Labor market softening signals and unemployment trend',
    ],
    Sports: [
      'Power rating and Elo-based win probability entering the playoff bracket',
      'Key player health and availability entering the tournament',
      'Historical championship conversion rate for teams at this seed/rating tier',
      'Bracket variance and path difficulty analysis',
    ],
    Tech: [
      'Internal milestone signals from developer community and API schema changes',
      'Historical release cadence for this lab and comparable product lines',
      'Competitive pressure and strategic incentives for timing',
      'Regulatory and safety review pipeline status',
    ],
    Other: [
      'Base rate frequency of comparable events in the reference class',
      'Resolution criteria specificity and ambiguity risk',
      'Expert consensus and domain-specific leading indicators',
      'Market liquidity and pricing efficiency assessment',
    ],
  };

  return {
    probability,
    confidence,
    reasoning: `After synthesizing research outputs and red-team critiques, I assign a probability of ${(probability * 100).toFixed(0)}% — ${edgePct} percentage points ${direction} the current market price of ${(market.marketPrice * 100).toFixed(0)}%. The ${confidence}-confidence assessment reflects ${confidence === 'high' ? 'strong convergent evidence across multiple independent sources with manageable uncertainty' : confidence === 'medium' ? 'directional consensus tempered by meaningful tail risks identified in the red-team phase' : 'genuine uncertainty with limited information advantage over the current market price'}. The red-team process surfaced ${edge > 0 ? 'material sources of upside that the market may be underweighting' : 'material downside risks that the market may be underpricing'}.`,
    calibrationNotes: `Base rate anchor: comparable historical events resolve at approximately ${(probability * 100).toFixed(0)}% frequency. Adjusted upward/downward by case-specific evidence identified in research phase. Red-team identified ${confidence === 'high' ? 'no fatal flaws in the directional thesis' : 'meaningful challenges that modestly reduce conviction'}. Final estimate represents a weighted ensemble of fundamentals-based and market-derived probability inputs. Recommend revisiting if new information materially updates any of the key factors below.`,
    keyFactors: KEY_FACTORS_BY_CATEGORY[market.category],
  };
}
