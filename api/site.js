const siteData = {
  businessName: 'Camo Man Outdoors',
  title: 'Camo Man Outdoors - Licensed New York State Hunting and Fishing Guide',
  slogan: 'Making your memories the trophy',
  serviceArea: 'Covering all of New York State',
  contactEmail: 'camomanoutdoors@gmail.com',
  bookingLinks: {
    fishing: 'mailto:camomanoutdoors@gmail.com?subject=Inland%20Fishing%20Appointment%20Request',
    whitetail: 'mailto:camomanoutdoors@gmail.com?subject=Whitetail%20Deer%20Appointment%20Request'
  },
  offerings: [
    {
      id: 'whitetail',
      category: 'Hunting',
      title: 'Whitetail Deer',
      summary: 'Guided whitetail deer hunts across New York with scouting, stand strategy, and field support.'
    },
    {
      id: 'open-water',
      category: 'Fishing',
      title: 'Inland Fishing (Open Water)',
      summary: 'Target bass, walleye, trout, pike, and panfish on New York lakes, rivers, and reservoirs.'
    },
    {
      id: 'ice-fishing',
      category: 'Fishing',
      title: 'Inland Fishing (Ice Fishing)',
      summary: 'Cold-weather guided trips with proven setups for perch, walleye, pike, and more.'
    }
  ]
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  res.status(200).json(siteData)
}
