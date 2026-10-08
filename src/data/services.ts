import type { Category, Service, ServiceOption } from '@/types';

const photos = {
  digital: ['photo-1460925895917-afdab827c52f','photo-1559028012-481c04fa702d','photo-1558655146-9f40138edfeb'],
  gifts: ['photo-1512412046876-f386342eddb3','photo-1544816155-12df9643f363','photo-1490312278390-ab64016e0aa9'],
  create: ['photo-1561070791-2526d30994b5','photo-1558655146-d09347e92766','photo-1541462608143-67571c6738dd'],
  studio: ['photo-1497366754035-f200968a6e72','photo-1497366811353-6870744d04b2','photo-1517245386807-bb43f82c33c4'],
  prints: ['photo-1541462608143-67571c6738dd','photo-1531403009284-440f080d1e12','photo-1556740738-b6a63e27c4df'],
};
const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;
const giftPhotos: Record<string,string[]> = {
  'branded-mugs': ['photo-1514228742587-6b1558fcca3d','photo-1495100497150-fe209c585f50','photo-1568036742660-e2681c3ee486'],
  'corporate-gift-box': ['photo-1545844568-98bb15133ec0'],
  'custom-tote-bags': ['photo-1574365569389-a10d488ca3fb'],
  'branded-water-bottles': ['photo-1725730929864-31959a4f1e50'],
};
const basic = (name: string, values: string[]): ServiceOption => ({ name, values });

type Seed = [string, Category, string, number, number, string[], string[], 'standard' | 'express', string, string[], ServiceOption[], string[], number?];
const seeds: Seed[] = [
  ['Website Development','digital','A considered digital home that works as hard as you do.',850000,1200,['startups','corporate','technology'],['launch','growth'],'standard','3–5 weeks',['Discovery workshop','Responsive pages','Content handover'],[basic('Package',['Starter','Growth','Custom'])],['logo-design','brand-identity-design','business-cards']],
  ['Landing Page Design','digital','One focused page designed to turn attention into action.',280000,400,['startups','technology','professional-services'],['launch','campaign'],'express','7–10 days',['Strategy call','Responsive design','Conversion focused layout'],[basic('Package',['Design only','Design + build'])],['logo-design','social-media-design-kit']],
  ['Social Media Management','digital','Keep your brand present, polished, and on message.',180000,260,['retail','beauty','hospitality'],['growth','campaign'],'standard','Monthly',['Content calendar','Branded assets','Monthly report'],[basic('Plan',['Essential','Momentum','Full service'])],['social-media-design-kit','product-photography']],
  ['SEO Campaign','digital','Get found by the people already looking for you.',220000,320,['technology','retail','professional-services'],['growth'],'standard','Monthly',['Site audit','Keyword strategy','Progress report'],[basic('Scope',['Local','National'])],['website-development','landing-page-design']],
  ['Branded Mugs','gifts','A daily reminder of a brand worth remembering.',6500,12,['corporate','events','hospitality'],['gifting','events'],'express','5–7 days',['Full color print','Artwork review','Protective packaging'],[basic('Quantity tier',['50 pieces','100 pieces','250 pieces']),basic('Finish',['Classic','Premium'])],['corporate-gift-box','logo-design']],
  ['Corporate Gift Box','gifts','A thoughtful branded experience, ready to give.',45000,65,['corporate','events','professional-services'],['gifting','events'],'standard','10–14 days',['Curated selection','Branded packaging','Message card'],[basic('Box size',['Standard','Signature']),basic('Quantity tier',['25 boxes','50 boxes','100 boxes'])],['branded-mugs','custom-tote-bags']],
  ['Custom Tote Bags','gifts','Take your brand into the everyday.',4500,9,['retail','events','beauty'],['gifting','events'],'express','5–8 days',['Single side print','Artwork check','Quality control'],[basic('Material',['Cotton','Canvas']),basic('Quantity tier',['100 bags','250 bags','500 bags'])],['product-packaging','flyers']],
  ['Branded Water Bottles','gifts','Useful, reusable, and unmistakably yours.',8500,16,['corporate','events','technology'],['gifting','events'],'standard','7–10 days',['Logo application','Proof approval','Protective packaging'],[basic('Style',['Classic','Insulated']),basic('Quantity tier',['50 bottles','100 bottles'])],['corporate-gift-box','event-backdrop']],
  ['Logo Design','create','A distinctive mark made to move with your ambition.',180000,250,['startups','retail','beauty'],['launch','rebrand'],'express','7–10 days',['Creative discovery','Three initial concepts','Final files for print and web'],[basic('Package',['Essential','Signature','Complete'])],['business-cards','website-development','corporate-gift-box']],
  ['Brand Identity Design','create','The complete visual language behind a memorable brand.',420000,600,['startups','corporate','hospitality'],['launch','rebrand'],'standard','2–3 weeks',['Logo suite','Colour and type system','Brand guidelines'],[basic('Package',['Foundation','Full identity'])],['business-cards','product-packaging','website-development']],
  ['Pitch Deck Design','create','Tell the story behind your next big opportunity.',160000,230,['startups','technology','professional-services'],['launch','growth'],'express','5–7 days',['Narrative structure','Up to 15 slides','Editable source file'],[basic('Length',['Up to 15 slides','Up to 25 slides'])],['brand-identity-design','landing-page-design']],
  ['Social Media Design Kit','create','A cohesive set of templates your team will actually use.',120000,170,['retail','beauty','hospitality'],['growth','campaign'],'express','5–7 days',['Feed templates','Story templates','Editable files'],[basic('Kit',['Starter','Expanded'])],['social-media-management','product-photography']],
  ['Product Photography','studio','Show every detail at its best.',240000,340,['retail','beauty','hospitality'],['launch','campaign'],'standard','7–10 days',['Creative direction','Studio session','Edited high-resolution images'],[basic('Session',['Half day','Full day'])],['product-packaging','social-media-design-kit']],
  ['Event Backdrop','studio','Set the scene for a moment people remember.',145000,210,['events','corporate','hospitality'],['events'],'express','5–7 days',['Backdrop design','Large format print','Finishing'],[basic('Size',['8 × 8 ft','10 × 8 ft','Custom'])],['roll-up-banners','branded-water-bottles']],
  ['Office Branding','studio','Make your space speak your brand language.',560000,800,['corporate','technology','professional-services'],['rebrand','growth'],'standard','2–4 weeks',['Space consultation','Visual concepts','Production guidance'],[basic('Scope',['Reception','Full workspace'])],['brand-identity-design','roll-up-banners']],
  ['Business Cards','prints','A first impression worth keeping.',18000,28,['startups','corporate','professional-services'],['launch','rebrand'],'express','3–5 days',['Print-ready proof','Premium stock','Double-sided print'],[basic('Quantity tier',['100 cards','250 cards','500 cards']),basic('Finish',['Matte','Soft touch','Gloss'])],['logo-design','brochures','branded-mugs']],
  ['Flyers','prints','Put your message directly into the right hands.',24000,36,['retail','events','hospitality'],['campaign','events'],'express','3–5 days',['Print-ready proof','Full color print','Trimmed finish'],[basic('Size',['A5','A4']),basic('Quantity tier',['250 flyers','500 flyers','1000 flyers'])],['event-backdrop','roll-up-banners']],
  ['Brochures','prints','More room to tell your story beautifully.',56000,85,['corporate','hospitality','professional-services'],['campaign','growth'],'standard','5–7 days',['Layout check','Full color print','Folded and finished'],[basic('Format',['Bi-fold','Tri-fold']),basic('Quantity tier',['100 copies','250 copies','500 copies'])],['business-cards','brand-identity-design']],
  ['Roll-up Banners','prints','Take a strong brand presence wherever you go.',72000,105,['events','corporate','retail'],['events','campaign'],'express','3–5 days',['Print-ready proof','Durable stand','Carry case'],[basic('Size',['Standard','Wide'])],['event-backdrop','flyers']],
  ['Product Packaging','prints','Turn the unboxing into part of the experience.',130000,190,['retail','beauty','hospitality'],['launch','rebrand'],'standard','10–14 days',['Structural consultation','Artwork adaptation','Print proof'],[basic('Format',['Sleeve','Box','Label set']),basic('Quantity tier',['100 units','250 units','500 units'])],['brand-identity-design','product-photography','custom-tote-bags']],
];

export const categories: { id: Category; name: string; description: string; number: string }[] = [
  { id:'digital', name:'Digital', description:'Build a presence that performs.', number:'01' },
  { id:'gifts', name:'Gifts', description:'Make every gesture count.', number:'02' },
  { id:'create', name:'Create', description:'Shape a brand that feels like you.', number:'03' },
  { id:'studio', name:'Studio', description:'Bring the big picture to life.', number:'04' },
  { id:'prints', name:'Prints', description:'Put your story into the world.', number:'05' },
];
export const industries = ['startups','corporate','retail','hospitality','events','beauty','technology','professional-services'];

export const services: Service[] = seeds.map((seed, index) => {
  const [name, category, shortDescription, ng, us, industry, useCases, urgency, turnaround, included, options, relatedServices, discount] = seed;
  const slug = name.toLowerCase().replaceAll(' ', '-');
  const photoIds = giftPhotos[slug] ?? photos[category];
  return { id: `srv-${index+1}`, slug, name, category, shortDescription,
    description: `${shortDescription} Our team brings strategy, craft, and careful execution together so every touchpoint feels unmistakably yours. We'll guide you from the first brief through to a finished result you can be proud to share.`,
    image: image(photoIds[giftPhotos[slug] ? 0 : index % photoIds.length]), images: giftPhotos[slug] ? photoIds.map(image) : [image(photoIds[index % photoIds.length]), image(photoIds[(index+1) % photoIds.length]), image(photoIds[(index+2) % photoIds.length])],
    pricing: { ng, us, uk: Math.round(us * 0.78), ca: Math.round(us * 1.36) },
    popularity: 100 - index * 3 + (category === 'create' ? 14 : 0), industries: industry, useCases, urgency, turnaround, included, options, relatedServices, discount,
  };
});
