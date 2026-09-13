import { BRAND, DEFAULT_DESCRIPTION, SITE_URL, TAGLINE } from '../lib/brand';

export type PillarSection = {
  heading: string;
  paragraphs: string[];
};

export type PillarFaq = {
  question: string;
  answer: string;
};

export type SeoPillar = {
  slug: string;
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  sections: PillarSection[];
  faqs: PillarFaq[];
  related: string[];
};

export const seoPillars: SeoPillar[] = [
  {
    slug: 'soulmate',
    path: '/soulmate',
    title: `Soulmate uden myter | ${BRAND}`,
    description:
      'Soulmate på SofiaDating betyder et match, der holder i hverdagen — ikke et eventyr om den eneste ene. Færre introduktioner. Bedre signal. Færre. Bedre.',
    eyebrow: 'Soulmate',
    h1: 'Soulmate er ikke et eventyr. Det er et liv, I kan holde.',
    lede:
      'Ordet soulmate bliver ofte brugt, som om kærlighed er et lynnedslag, man enten får eller mister. På SofiaDating bruger vi ordet mere jordnært: et menneske, hvis tempo, værdier og hverdag kan rumme dit — og omvendt. Ikke fordi I er identiske. Fordi I kan blive ved med at vælge hinanden, når gnisten er blevet til vaner.',
    sections: [
      {
        heading: 'Hvad soulmate betyder, når Hollywood er slukket',
        paragraphs: [
          'En soulmate er ikke den person, der får tiden til at forsvinde på en første date, og som derfor “må være den rigtige”. Kemi er et signal. Det er ikke en kontrakt. Det, de fleste faktisk leder efter, når de siger soulmate, er genkendelse: nogen der forstår dine pauser, dine principper og den måde, du bygger et liv på.',
          'SofiaDating tager den længsel alvorligt uden at love magi. Vi kan ikke levere “den eneste ene”. Vi kan gøre rummet mindre, så søgningen ikke drukner i profiler, der kun ligner et øjeblik. Færre. Bedre. er ikke et slogan om at være kræsen. Det er en metode til at holde opmærksomheden samlet.',
          'Når vi siger eksklusiv, mener vi kvaliteten af introduktionen — ikke jobtitel, indkomst eller postnummer. En soulmate-søgning, der først sorterer på status, leder efter et visitkort. Vi leder efter et menneske, du kan holde en onsdag med.',
        ],
      },
      {
        heading: 'Hvorfor endeløse matches sjældent fører til et livsvarigt ja',
        paragraphs: [
          'Swipe-feeds er bygget til at holde hånden i bevægelse. Jo flere ansigter, desto sværere bliver det at mærke, hvem der faktisk passer. Hjernen behandler det som et marked. Et marked belønner sammenligning. Sammenligning belønner tvivl.',
          'En soulmate findes ikke ved at øge volumen. Den findes ved at skærpe spørgsmålet: Hvad skal være sandt i mit liv, før jeg inviterer et andet menneske ind i det? Når spørgsmålet er skarpt, behøver du ikke 40 samtaler. Du har brug for nogle få, der er værd at tage alvorligt.',
          'Derfor arbejder SofiaDating med færre, mere relevante introduktioner som Select i Datez Network. Vi fjerner ikke valget. Vi fjerner støjen, der får valget til at føles billigt.',
        ],
      },
      {
        heading: 'Tegn på et match, der kan bære mere end en aften',
        paragraphs: [
          'Et godt første møde kan være latter, nysgerrighed og et glas, der bliver koldt, fordi I glemmer det. Det er værdifuldt. Det er stadig kun et første kapitel. Det, der skiller et aften-match fra et soulmate-spor, er ofte det, der sker bagefter: om I kan holde en ærlig samtale om tid, børn, arbejde, stilhed og det, I ikke vil gå på kompromis med.',
          'Læg mærke til, om den anden person kan holde pause uden at fylde den med præstation. Læg mærke til, om I taler om jeres uger — ikke kun jeres højdepunkter. Soulmate-arbejde er ofte undervurderet, fordi det ser kedeligt ud udefra. Indefra er det trygt.',
          'SofiaDating beder dig derfor om det, der faktisk betyder noget, før vi viser dig mennesker: tempo, intention, geografi, og den slags hverdag du vil dele. Ikke for at gøre dating til et skema. For at undgå at spilde nogens tirsdag på et ja, der aldrig kunne blive til et liv.',
        ],
      },
      {
        heading: 'Sådan arbejder SofiaDating med soulmate-søgning',
        paragraphs: [
          'SofiaDating er ét brand i Datez Network. Profilen kan være gratis. Synlighed og dybde kan løftes med PLUS eller DATEZ+, hvis du selv vælger det. Ingen af delene gør dig mere værd som menneske. De ændrer kun, hvor tydeligt dit signal står i rummet.',
          'Vi lover ikke et tal for, hvor mange der “finder kærligheden hos os”. Vi lover en ramme: færre introduktioner, tydeligere intention, og et sprog der ikke forveksler eksklusivitet med formue. Hvis du leder efter et rum, hvor soulmate betyder noget andet end status, er det her meningen med rummet.',
          'Du kan begynde stille. Læs videre i klyngen — især kvalitet frem for kvantitet og rolig dating — og beslut bagefter, om du vil træde ind. Et soulmate-valg haster aldrig så meget, som et feed prøver at få det til.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Kan SofiaDating love, at jeg finder min soulmate?',
        answer:
          'Nej. Ingen ærlig datingside kan love et livsvarigt match. SofiaDating kan gøre søgningen roligere og mere præcis ved at vise færre, mere relevante introduktioner.',
      },
      {
        question: 'Betyder soulmate, at I matcher på astrologi eller “the one”?',
        answer:
          'Nej. Vi bruger ordet som et jordnært mål: et menneske, hvis værdier og hverdag kan bære dit liv. Ikke som en myte om skæbne.',
      },
      {
        question: 'Er SofiaDating kun for folk med høj indkomst?',
        answer:
          'Nej. Eksklusiv betyder hos os kvalitet i introduktionen — ikke job, formue eller titel. Select i Datez Network sorterer på relevans, ikke på status.',
      },
    ],
    related: [
      'find-den-rigtige',
      'kvalitet-frem-for-kvantitet',
      'rolig-dating',
    ],
  },
  {
    slug: 'dating-med-omtanke',
    path: '/dating-med-omtanke',
    title: `Dating med omtanke | ${BRAND}`,
    description:
      'Dating med omtanke på SofiaDating er tempo, ærlig intention og færre, bedre møder. Ikke flere matches. Ikke status. Færre. Bedre.',
    eyebrow: 'Dating med omtanke',
    h1: 'Dating med omtanke er at gøre plads, før du gør krav.',
    lede:
      'Omtanke lyder blødt. I praksis er det en skarp disciplin: at sige, hvad du søger, at lade den anden tænke, og at undlade at fylde andres uge med et ja, du ikke mener. SofiaDating er bygget til den slags dating — ikke til at vinde et feed.',
    sections: [
      {
        heading: 'Omtanke er det modsatte af performance',
        paragraphs: [
          'Meget moderne dating belønner den, der svarer hurtigst, ser bedst ud i tre billeder og kan holde en samtale kørende som en podcast. Det kan være underholdende. Det er sjældent omhyggeligt. Omtanke begynder, når du dropper at optræde og i stedet spørger: Har jeg tid og ærlighed til det her menneske?',
          'En besked sendt af vaner er ikke venlighed. En date booket for ikke at være alene i weekenden er ikke nysgerrighed. Dating med omtanke er at mærke forskellen, før du inviterer nogen ud af deres aften.',
          'SofiaDating kalder det ikke moral. Vi kalder det et bedre filter. Når rummet er mindre, bliver det lettere at være præcis. Præcision er en form for høflighed.',
        ],
      },
      {
        heading: 'Ærlighed om intention er den første omsorg',
        paragraphs: [
          'Omtanke starter før det første glas. Den starter i sætningen “jeg søger…”. Hvis du vil have noget roligt og langvarigt, er det ikke koldt at skrive det. Det er at give den anden en chance for at vælge ja eller nej uden at gætte.',
          'Mange holder intentionen sløret, fordi de er bange for at virke tunge. Resultatet er tunge uger: samtaler, der aldrig får lov at lande, og møder der slutter med et “lad os se”. Se er et sted. Det er sjældent et forhold.',
          'På SofiaDating beder vi om intention tidligt, fordi Datez Network Select kun giver mening, hvis signalet er sandt. Et kurateret rum fyldt med uklare jaer er bare et mindre feed.',
        ],
      },
      {
        heading: 'Tempo, svar og den uge I begge kan holde',
        paragraphs: [
          'Omtanke viser sig i kalenderen. Hvis du booker tre first dates på fire dage, har du ikke tid til at mærke nogen af dem. Hvis du lader en samtale ligge i to uger uden et ord, har du bedt den anden om at bære usikkerheden alene.',
          'Rolig er ikke det samme som langsom-til-at-svare. Rolig er at svare, når du har noget at sige, og at sige, når du ikke har mere at give. Ghosting er ikke et temperament. Det er en afslutning, du ikke tog ansvar for.',
          'Vi designer SofiaDating, så du ikke skal holde 12 tråde i luften for at føle, at du “gør dating rigtigt”. Færre introduktioner gør det muligt at være et helt menneske i de samtaler, du faktisk har.',
        ],
      },
      {
        heading: 'Omtanke er også grænser og et rum uden statusjagt',
        paragraphs: [
          'At date med omtanke er at passe på både dig og den anden: tydelige grænser, ingen pres for at mødes hurtigere end I er parate, og ingen forventning om, at nogen skal bevise deres værdi med job, bil eller adresse.',
          'Eksklusivitet på SofiaDating er ikke en port, kun de rige kommer igennem. Det er en redigering. Vi fjerner mængden, så opmærksomheden kan blive venlig igen. Hvis du leder efter et rum, hvor omsorg ikke er det samme som eftergivenhed, er det her klyngens kerne.',
          'Læs videre om rolig dating, hvis du vil have sprog for tempoet — og om kvalitet frem for kvantitet, hvis du vil forstå, hvorfor færre møder ofte er den mest hensynsfulde vej.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Hvad betyder dating med omtanke hos SofiaDating?',
        answer:
          'Det betyder ærlig intention, et tempo I begge kan holde, og færre introduktioner, så du ikke bruger andres tid på et ja, du ikke mener.',
      },
      {
        question: 'Er omtanke det samme som at være “for seriøs”?',
        answer:
          'Nej. Omtanke kan rumme humor, lette møder og langsom nysgerrighed. Det, den ikke rummer, er at holde flere mennesker hen uden at sige, hvad du søger.',
      },
      {
        question: 'Skal jeg betale for at date med omtanke her?',
        answer:
          'Du kan oprette en gratis profil. PLUS og DATEZ+ er valgfri synlighed — ikke en adgangsbillet til at være et anstændigt menneske i rummet.',
      },
    ],
    related: ['rolig-dating', 'kvalitet-frem-for-kvantitet', 'soulmate'],
  },
  {
    slug: 'find-den-rigtige',
    path: '/find-den-rigtige',
    title: `Find den rigtige | ${BRAND}`,
    description:
      'Find den rigtige på SofiaDating ved at skærpe valget, ikke ved at øge mængden. Relevans frem for status. Færre. Bedre.',
    eyebrow: 'Find den rigtige',
    h1: 'At finde den rigtige er at vælge bedre — ikke at se flere.',
    lede:
      '“Den rigtige” bliver tit forvekslet med “den eneste”, som om der findes én nøgle til dit liv gemt i en bunke profiler. SofiaDating arbejder med et andet billede: den rigtige er den, der passer til det liv, du faktisk har — og det liv, du vil bygge. Det kræver et skarpere spørgsmål. Ikke et større katalog.',
    sections: [
      {
        heading: 'Den rigtige er et overlap, ikke en jackpot',
        paragraphs: [
          'Du finder ikke den rigtige ved at vente på et menneske, der nikker til hvert punkt på din liste. Du finder et overlap: nok fælles retning til, at forskellene bliver interessante i stedet for umulige. Overlap kan handle om børn, geografi, tro, tempo, venner, eller den måde I bruger en søndag på.',
          'Lister, der kun handler om højde, stilling og ferievaner, finder en type. De finder sjældent et liv. Den rigtige for dig er den, der kan være i rummet, når listen ikke længere er sjov.',
          'SofiaDating hjælper dig med at formulere overlap, før vi viser ansigter. Det er derfor rummet føles mindre. Et mindre rum er ikke fattigere. Det er tydeligere.',
        ],
      },
      {
        heading: 'Signal og støj, når du leder i Danmark',
        paragraphs: [
          'Dansk dating er ofte kort i sproget og langt i tvivlen. Vi skriver “vi ses” og mener “måske”. Vi er bange for at virke ivrige og ender med at virke fraværende. Hvis du vil finde den rigtige, skal dit signal kunne læses: hvad du søger, hvor du bor, og hvilket tempo du kan holde.',
          'Støj er ikke kun fake profiler og uendelige likes. Støj er også samtaler, der aldrig får en retning, og møder booket fordi appen mindede dig om, at du var single. SofiaDating kan ikke fjerne al støj fra dating. Vi kan nægte at bygge et produkt, der lever af den.',
          'Select i Datez Network er et redigeret udsnit. Du ser færre mennesker, fordi den rigtige ikke bliver tydeligere af at stå i en mængde. Hen bliver tydeligere, når der er plads omkring valget.',
        ],
      },
      {
        heading: 'Spørgsmål, der faktisk flytter et valg',
        paragraphs: [
          'I stedet for “kan jeg se os på et billede?” så prøv “kan jeg se os i en almindelig uge?”. I stedet for “er kemen der?” så prøv “kan vi tale om det, der er svært, uden at en af os forsvinder?”. De spørgsmål er mindre fotogene. De er mere præcise.',
          'Spørg også dig selv, hvad du er parat til at være rigtig for. Den rigtige for et menneske, der ikke har tid, findes ikke. Den rigtige for et menneske, der stadig sørger, kan findes senere. Timing er ikke en undskyldning. Den er en del af sandheden.',
          'Når du har svarene, bliver SofiaDating lettere at bruge: du kan lade rummet være lille og stadig føle, at du leder aktivt. Aktiv leder er ikke det samme som travl leder.',
        ],
      },
      {
        heading: 'Hvad SofiaDating ikke gør, når du vil finde den rigtige',
        paragraphs: [
          'Vi viser ikke stjerner, der skal overbevise dig om, at “andre har fundet kærligheden her”. Vi opfinder ikke medlems-tal, der skal få rummet til at virke større, end det er. Tillid bygges af en ærlig ramme — ikke af en scene.',
          'Vi sorterer heller ikke mennesker efter formue. Hvis “den rigtige” for dig først og fremmest er en indkomst, er SofiaDating det forkerte rum. Her betyder eksklusiv, at introduktionen er valgt med omhu. Ikke at gæsten har den dyreste jakke.',
          'Gå derfra til soulmate, hvis du vil have sprog for det langvarige, eller til kvalitet frem for kvantitet, hvis du vil forstå metoden bag det lille rum.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Hvordan hjælper SofiaDating mig med at finde den rigtige?',
        answer:
          'Ved at skærpe dit signal — intention, tempo, hverdag — og vise færre, mere relevante introduktioner. Ikke ved at love ét bestemt menneske.',
      },
      {
        question: 'Er “den rigtige” det samme som “den eneste”?',
        answer:
          'Nej. Den rigtige er et overlap, der kan bære et liv. Den eneste er en myte, der ofte holder folk i et feed længere, end de har brug for.',
      },
      {
        question: 'Skal jeg være i en stor by for at finde nogen her?',
        answer:
          'Nej. Relevans slår volumen. Et ærligt signal i en mindre by er ofte stærkere end 200 uafklarede jaer i en hovedstad.',
      },
    ],
    related: ['soulmate', 'kvalitet-frem-for-kvantitet', 'dating-med-omtanke'],
  },
  {
    slug: 'kvalitet-frem-for-kvantitet',
    path: '/kvalitet-frem-for-kvantitet',
    title: `Kvalitet frem for kvantitet | ${BRAND}`,
    description:
      'Kvalitet frem for kvantitet er SofiaDatings metode: færre, bedre introduktioner. Eksklusiv betyder relevans — ikke rigdom. Færre. Bedre.',
    eyebrow: 'Kvalitet frem for kvantitet',
    h1: 'Kvalitet frem for kvantitet er ikke luksus. Det er fokus.',
    lede:
      `${TAGLINE} er hele SofiaDatings sætning. Den betyder, at vi hellere viser dig tre mennesker, der kan være et ja, end tredive, der kun er et måske. Kvalitet er ikke champagne og medlemskort. Kvalitet er, at introduktionen har en grund.`,
    sections: [
      {
        heading: 'Hvorfor flere muligheder ofte giver dårligere dating',
        paragraphs: [
          'Valgteori er ikke en dating-myte. Når listen er uendelig, falder tilfredsheden med det, du har foran dig. Du begynder at lede efter en fejl, så du kan vende tilbage til feedet. Feedet belønner dig for at blive. Det belønner sjældent dig for at lande.',
          'Kvantitet føles som arbejde, der nytter. Du har “været aktiv”. Du har liket. Du har holdt samtaler i live. Men aktivitet er ikke det samme som bevægelse. Bevægelse er et møde, du husker om en måned, fordi det ændrede dit spørgsmål.',
          'SofiaDating nægter at måle succes på, hvor mange profiler du kan komme igennem. Vi måler rummet på, om du kan være til stede i det, du ser.',
        ],
      },
      {
        heading: 'Eksklusiv betyder kvalitet — ikke formue',
        paragraphs: [
          'Ordet eksklusiv er blevet ødelagt af luksusdating. Det har fået lov at betyde dyre ure, titler og et rum, man skal tjene sig ind i. Hos SofiaDating betyder det noget andet, og vi gentager det med vilje: eksklusiv er ikke job, indkomst eller status. Eksklusiv er færre og mere relevante introduktioner.',
          'Et menneske med et stille arbejde kan være det bedste match i rummet. Et menneske med en høj løn kan være det dårligste, hvis intentionen er sløret, eller tempoet er et show. Select i Datez Network redigerer efter relevans. Ikke efter formue.',
          'Hvis du kommer her for at blive set som et trofæ, vil rummet føles for småt. Hvis du kommer her for at blive mødt, vil det samme rum føles som en lettelse.',
        ],
      },
      {
        heading: 'Hvad en god introduktion faktisk indeholder',
        paragraphs: [
          'En god introduktion har en sætning, du kan begynde med, som ikke er “hej, hvad laver du?”. Den har et overlap, I begge kan genkende. Den har nok kontekst til, at det første møde ikke skal bære hele forklaringen.',
          'Det er derfor SofiaDating ligner et redigeret hus mere end et marked. Ikke fordi vi leger klub. Fordi et hus har vægge. Vægge er det, der gør, at en samtale kan blive i rummet i stedet for at løbe videre til næste dør.',
          'PLUS og DATEZ+ ændrer synlighed, hvis du selv vil det. De køber ikke “bedre mennesker”. De køber et tydeligere signal. Grundprofilen kan være gratis, fordi kvalitet i valget ikke skal starte med et abonnement.',
        ],
      },
      {
        heading: 'Sådan bruger du klyngen, når du er træt af mængden',
        paragraphs: [
          'Hvis dit problem er tempo, så læs rolig dating. Hvis dit problem er slørede intentioner, så læs dating med omtanke. Hvis dit problem er myten om den eneste ene, så læs soulmate og find den rigtige. Denne side er metoden, de andre sider står på.',
          'Du behøver ikke tro på et brand for at bruge en metode. Prøv den i en uge uden for appen: sig nej til ét ja, du ikke mener, og ja til ét møde, du faktisk kan være i. Mærk forskellen. Det er hele argumentet.',
          'SofiaDating er her bagefter, hvis du vil have et rum, der er bygget til den forskel. Datez Network. Viniko. Ingen opdigtede anmeldelser. Ingen stjerner, der skal spille bevis.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Hvad betyder kvalitet frem for kvantitet på SofiaDating?',
        answer:
          'At du ser færre introduktioner, og at hver af dem har en grund. Metoden hedder Færre. Bedre. — ikke flere matches.',
      },
      {
        question: 'Er SofiaDating en luksus-datingside?',
        answer:
          'Nej. Eksklusivitet her er redigering og relevans. Den har ikke noget med formue, titel eller “high society” at gøre.',
      },
      {
        question: 'Hvorfor viser I ikke brugeranmeldelser med stjerner?',
        answer:
          'Fordi opdigtede ratings og medlems-tal skaber et forkert signal. Vi vil hellere beskrive metoden ærligt end at spille socialt bevis.',
      },
    ],
    related: [
      'dating-med-omtanke',
      'rolig-dating',
      'find-den-rigtige',
    ],
  },
  {
    slug: 'rolig-dating',
    path: '/rolig-dating',
    title: `Rolig dating | ${BRAND}`,
    description:
      'Rolig dating på SofiaDating er et tempo, nervesystemet kan holde: færre tråde, tydeligere ja, ingen feed der jager dig. Færre. Bedre.',
    eyebrow: 'Rolig dating',
    h1: 'Rolig dating giver nervesystemet tid til at sige ja.',
    lede:
      'Rolig dating er ikke det samme som uinteresseret dating. Det er at sænke farten, så kroppen kan skelne mellem spænding og tryghed. SofiaDating er bygget til det tempo: et lille rum, en ærlig intention, og ingen maskine der belønner dig for at blive oppe og swipe.',
    sections: [
      {
        heading: 'Hvorfor fart skaber falske nej — og falske ja',
        paragraphs: [
          'Når alt skal ske hurtigt, siger nervesystemet ofte nej til det, der er nyt, og ja til det, der ligner det, du kender. Det er praktisk i trafik. Det er en dårlig matchmaker. Et menneske, der kunne have været rigtigt, bliver afvist, fordi samtalen ikke performede i de første ti minutter.',
          'Omvendt kan fart også lave et ja, der kun er adrenalin. I booker næste aften, fordi stilhed føles farlig. Rolig dating tillader stilheden. Den spørger, om interessen stadig er der, når pulsen er faldet.',
          'SofiaDating gør rummet stille med vilje. Færre introduktioner. Ingen evig rulle. Et ja, der har fået lov at blive et ja, er mere værd end ti jaer, der kun var bevægelse.',
        ],
      },
      {
        heading: 'En uge i roligt tempo',
        paragraphs: [
          'Rolig dating kan se sådan ud: én samtale, du svarer i, når du har noget at sige. Ét møde i kalenderen, du ikke skal skynde dig videre fra. En aften uden appen, så du kan mærke, om du savner personen — eller bare savner at være i gang.',
          'Det er ikke en kur. Det er en ramme. Nogle uger har du mere overskud. Nogle uger skal dating vente, fordi arbejdet eller børnene fylder. Et rum, der straffer dig for det med forsvundne likes, er ikke roligt. Det er et hamsterhjul med bløde farver.',
          'Select i Datez Network passer til den ramme, fordi det ikke kræver, at du “holder momentum”. Momentum er et produktord. Mennesker har årstider.',
        ],
      },
      {
        heading: 'Første date, uden at gøre den til en audition',
        paragraphs: [
          'En rolig første date har et sted, I kan tale, en sluttid I kan overholde, og en udvej, der ikke kræver teater. Kaffe i dagslys er ikke kedeligt. Det er et tempo, hvor I kan se hinandens ansigter, når sætningen bliver ærlig.',
          'Tag telefonen ned. Ikke som en regel, I slår hinanden i hovedet med. Som en måde at være i det rum, I faktisk bookede. Hvis der ikke er noget, er det også information. Rolig dating tåler et nej, der kommer samme aften, sagt venligt.',
          'SofiaDating kan ikke sidde med ved bordet. Vi kan sørge for, at du ikke ankommer med fem andre samtaler i lommen. Det alene ændrer stemmen, du møder den anden med.',
        ],
      },
      {
        heading: 'Rolig er ikke det samme som at gemme sig',
        paragraphs: [
          'Nogle bruger “jeg tager det bare roligt” som en måde at holde alle døre åbne. Det er ikke ro. Det er tåge. Rolig dating siger stadig, hvad du søger. Den siger det bare uden at jage.',
          'Hvis du vil have sprog for den ærlighed, så læs dating med omtanke. Hvis du vil forstå, hvorfor rummet er lille, så læs kvalitet frem for kvantitet. Hvis du leder efter det langvarige ord, så læs soulmate.',
          'SofiaDating — ét ord — er Datez Networks bud på et sted, hvor ro ikke er branding, men redigering. Viniko CVR 44072122. Ingen opdigtede stjerner. Ingen påstået folkemængde. Bare et rum, der er bygget til at blive i.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Hvad er rolig dating på SofiaDating?',
        answer:
          'Et tempo med færre tråde og færre introduktioner, så du kan mærke forskel på spænding og tryghed. Ikke et løfte om, at intet nogensinde føles sårbart.',
      },
      {
        question: 'Betyder rolig dating, at jeg skal vente i måneder?',
        answer:
          'Nej. Rolig betyder, at I ikke jager et ja. I kan stadig mødes i næste uge, hvis I begge har plads og lyst.',
      },
      {
        question: 'Er SofiaDating kun for introverte?',
        answer:
          'Nej. Et stille rum kan rumme både den, der taler meget, og den, der taler lidt. Det, rummet ikke rummer, er et feed der belønner evig bevægelse.',
      },
    ],
    related: ['dating-med-omtanke', 'kvalitet-frem-for-kvantitet', 'soulmate'],
  },
];

export const seoPillarBySlug = Object.fromEntries(
  seoPillars.map((pillar) => [pillar.slug, pillar]),
) as Record<string, SeoPillar>;

export const seoPillarSlugs = seoPillars.map((pillar) => pillar.slug);

export function pillarUrl(slug: string): string {
  return `${SITE_URL}/${slug}`;
}

export function findPillar(slug: string): SeoPillar | undefined {
  return seoPillarBySlug[slug];
}

export const homeSeo = {
  path: '/',
  title: `${BRAND} – ${TAGLINE}`,
  description: DEFAULT_DESCRIPTION,
};
