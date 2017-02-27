const birds = [
  {
    uuid: '0001',
    name: 'Ruby-crowned Kinglet',
    latinName: 'Regulus calendula',
    text: 'Ruby-crowned Kinglets can be identified by their small tails, large heads, small straight beaks, and the scarlet crests found on males of the species. These tiny birds are commonly seen on lower branches in North American forests where they feed on small insects and spiders. Ruby-crowned Kinglets are extremely active birds that can sometimes be seen hovering near leaves, searching for insects.',
    group: 'Powdermill',
    sound: {
      iosNotification: 'ruby_crowned_kinglet_notification.aif',
      androidNotification: 'ruby_crowned_kinglet_notification.mp3',
      filename: 'ruby_crowned_kinglet_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 6000,
        },
      ],
      chirpLength: 2200,
    },
    images: {
      infoCard: 'rubycrownedkinglet',
      face: 'birdfaces_rubycrownedkinglett',
      icon: 'birdicons_rubycrownedkinglett',
      iconMirrored: 'birdicons_rubycrownedkinglett_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.26,
      iconHeight: 0.23,
      mirrored: false,
      iconPosition: {
        top: 0.17,
        left: 0.17,
      },
      labelPosition: {
        bottom: 10,
      },
      haloPosition: {
        left: -0.15,
        top: -0.1,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.23,
      iconHeight: 0.2,
      perchPosition: {
        left: 0.53,
        top: 0.85,
      },
    },
  },
  {
    uuid: '0002',
    name: 'Black-capped Chickadee',
    latinName: 'Poecile atricapillus',
    text: 'Tiny Black-capped Chickadees are easily distinguished by their black heads and miniature beaks. They often make brief appearances at bird feeders to collect seeds that they sometimes hide for later. These social little birds are found year round in northeastern forests and don’t shy away from humans. Known for their familiar “chick-a-dee-dee-dee” call, these birds are commonly spotted during winter when fewer birds are present.',
    group: 'Powdermill',
    sound: {
      iosNotification: 'black_capped_chickadee_notification.aif',
      androidNotification: 'black_capped_chickadee_notification.mp3',
      filename: 'black_capped_chickadee_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 1700,
        },
      ],
      chirpLength: 1700,
    },
    images: {
      infoCard: 'blackcappedchickadee',
      face: 'birdfaces_blackcappedchickadee',
      icon: 'birdicons_blackcappedchickadee',
      iconMirrored: 'birdicons_blackcappedchickadee_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.3,
      iconHeight: 0.28,
      mirrored: true,
      iconPosition: {
        top: 0.36,
        left: 0.59,
      },
      labelPosition: {
        bottom: 34,
      },
      haloPosition: {
        left: -0.15,
        top: -0.1,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.27,
      iconHeight: 0.25,
      perchPosition: {
        left: 0.4,
        top: 0.65,
      },
    },
  },
  {
    uuid: '0003',
    name: 'Brown Creeper',
    latinName: 'Certhia americana',
    text: 'Brown Creepers are the only wood creepers found in the continental United States. They build hammock-shaped nests behind peeling bark. They use their thin, curved bill to peel back tree bark and search for spiders. Brown Creepers always climb up a tree, and upon reaching the top, they will flutter down to the base of another.',
    group: 'BirdSafe',
    sound: {
      iosNotification: 'brown_creeper_notification.aif',
      androidNotification: 'brown_creeper_notification.mp3',
      filename: 'brown_creeper_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 1600,
        },
      ],
      chirpLength: 1500,
    },
    images: {
      infoCard: 'browncreeper',
      face: 'birdfaces_browncreeper',
      icon: 'birdicons_browncreeper',
      iconMirrored: 'birdicons_browncreeper_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.27,
      iconHeight: 0.27,
      mirrored: false,
      iconPosition: {
        top: 0.51,
        left: 0.11,
      },
      labelPosition: {
        bottom: 28,
      },
      haloPosition: {
        left: -0.15,
        top: -0.18,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.24,
      iconHeight: 0.24,
      perchPosition: {
        left: 0.3,
        top: 0.67,
      },
    },
  },
  {
    uuid: '0004',
    name: 'Tennessee Warbler',
    done: true,
    latinName: 'Oreothlypis peregrina',
    text: 'Tennessee Warblers are small, drably colored songbirds whose migrations follow spruce budworm population fluctuations. In addition to budworms, these birds also drink nectar, a rarity among warblers. They feed by piercing the sides of flowers, thus not pollinating plants in the process.',
    group: 'CMNH',
    sound: {
      iosNotification: 'tennessee_warbler_notification.aif',
      androidNotification: 'tennessee_warbler_notification.mp3',
      filename: 'tennessee_warbler_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 3200,
        },
      ],
      chirpLength: 3200,
    },
    images: {
      infoCard: 'tennesseewarbler',
      face: 'birdfaces_tennesseewarbler',
      icon: 'birdicons_tennesseewarbler',
      iconMirrored: 'birdicons_tennesseewarbler_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.33,
      iconHeight: 0.21,
      mirrored: true,
      iconPosition: {
        top: 0.75,
        left: 0.56,
      },
      labelPosition: {
        bottom: 23,
      },
      haloPosition: {
        left: -0.13,
        top: -0.12,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.3,
      iconHeight: 0.18,
      perchPosition: {
        left: 0.47,
        top: 0.8,
      },
    },
  },
  {
    uuid: '0005',
    name: 'Black-and-white Warbler',
    latinName: 'Mniotilta varia',
    text: 'Boldly striped Black-and-white Warblers are easily identified by their unique plumage. They often build their cup-shaped nests on the ground in eastern forests. Their song is sometimes described as sounding like a squeaking wheel. Unlike other warblers, they feed by creeping up and down trees searching for insects behind bark.',
    group: 'BirdSafe',
    sound: {
      iosNotification: 'bw_warbler_notification.aif',
      androidNotification: 'bw_warbler_notification.mp3',
      filename: 'bw_warbler_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 2200,
        },
      ],
      chirpLength: 2200,
    },
    images: {
      infoCard: 'blackwhitewarbler',
      face: 'birdfaces_blackwhitewarbler',
      icon: 'birdicons_blackwhitewarbler',
      iconMirrored: 'birdicons_blackwhitewarbler_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.39,
      iconHeight: 0.2,
      mirrored: false,
      iconPosition: {
        top: 0.925,
        left: 0.065,
      },
      labelPosition: {
        bottom: 12,
      },
      haloPosition: {
        left: -0.13,
        top: -0.05,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.34,
      iconHeight: 0.17,
      perchPosition: {
        left: 0.42,
        top: 0.84,
      },
    },
  },
  {
    uuid: '0006',
    name: 'Magnolia Warbler',
    latinName: 'Setophaga magnolia',
    text: 'Magnolia Warblers are small, yellow-chested songbirds that are prevalent in eastern forests. They can easily be identified by the presence of a white bar that crosses their tail. They have a short and weak song that sounds like “weta weta weta.” Male warblers have brighter yellow plumage than females and distinctive black face masks and stripes on their breasts. They are often seen in trees and bushes looking for aphids and other tiny insects on the undersides of leaves.',
    group: 'Powdermill',
    sound: {
      iosNotification: 'magnolia_warbler_notification.aif',
      androidNotification: 'magnolia_warbler_notification.mp3',
      filename: 'magnolia_warbler_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 1500,
        },
      ],
      chirpLength: 1500,
    },
    images: {
      infoCard: 'magnoliawarbler',
      face: 'birdfaces_magnoliawarbler',
      icon: 'birdicons_magnoliawarbler',
      iconMirrored: 'birdicons_magnoliawarbler_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.295,
      iconHeight: 0.29,
      mirrored: true,
      iconPosition: {
        top: 1.09,
        left: 0.6,
      },
      labelPosition: {
        bottom: 30,
      },
      haloPosition: {
        left: -0.15,
        top: -0.13,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.27,
      iconHeight: 0.26,
      perchPosition: {
        left: 0.35,
        top: 0.7,
      },
    },
  },
  {
    uuid: '0007',
    name: 'American Redstart',
    latinName: 'Setophaga ruticilla',
    text: 'American Redstart males are black birds with bright orange undersides and long tails. The female has more drab, grayish plumage with yellow spots. They dwell in deciduous woodlands near water and use their brightly colored tails to scare insects off of leaves when they feed. American Redstarts are known to be very active and highly territorial.',
    group: 'Powdermill',
    sound: {
      iosNotification: 'american_redstart_notification.aif',
      androidNotification: 'american_redstart_notification.mp3',
      filename: 'american_redstart_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 1100,
        },
      ],
      chirpLength: 1100,
    },
    images: {
      infoCard: 'americanredstart',
      face: 'birdfaces_americanredstart',
      icon: 'birdicons_americanredstart',
      iconMirrored: 'birdicons_americanredstart_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.24,
      iconHeight: 0.23,
      mirrored: false,
      iconPosition: {
        top: 1.26,
        left: 0.14,
      },
      labelPosition: {
        bottom: 12,
      },
      haloPosition: {
        left: -0.18,
        top: -0.07,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.21,
      iconHeight: 0.18,
      perchPosition: {
        left: 0.35,
        top: 0.9,
      },
    },
  },
  {
    uuid: '0008',
    name: 'Pine Siskin',
    latinName: 'Spinus pinus',
    text: 'Pine Siskins are small finches with wheezy songs and a flash of yellow on their wings. Their appearance in the eastern United States is dependent on cone crops in the boreal forests of Canada. They can sometimes be found hanging upside down in coniferous trees to pick at seeds below.',
    group: 'CMNH',
    sound: {
      iosNotification: 'pine_siskin_notification.aif',
      androidNotification: 'pine_siskin_notification.mp3',
      filename: 'pine_siskin_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 3700,
        },
        {
          type: 'silence',
          length: 700,
        },
        {
          type: 'song',
          length: 500,
        },
      ],
      chirpLength: 3700,
    },
    images: {
      infoCard: 'pinesiskin',
      face: 'birdfaces_pinesiskin',
      icon: 'birdicons_pinesiskin',
      iconMirrored: 'birdicons_pinesiskin_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.34,
      iconHeight: 0.22,
      mirrored: false,
      iconPosition: {
        top: 1.48,
        left: 0.33,
      },
      labelPosition: {
        bottom: 5,
      },
      haloPosition: {
        left: -0.13,
        top: -0.15,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.31,
      iconHeight: 0.19,
      perchPosition: {
        left: 0.4,
        top: 0.98,
      },
    },
  },
  {
    uuid: '0009',
    name: 'Ovenbird',
    latinName: 'Seiurus aurocapilla',
    text: 'Ovenbirds get their name from their covered, dome-shaped nests that resemble outdoor cob ovens. Neighboring male Ovenbirds often sing their ascending “tea-cher, tea-cher” song in unison. Although more often heard than seen, they can be found strutting and scratching around on the forest floor searching for small insects.',
    group: 'BirdSafe',
    sound: {
      iosNotification: 'ovenbird_notification.aif',
      androidNotification: 'ovenbird_notification.mp3',
      filename: 'ovenbird_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 2500,
        },
      ],
      chirpLength: 2500,
    },
    images: {
      infoCard: 'ovenbird',
      face: 'birdfaces_ovenbird',
      icon: 'birdicons_ovenbird',
      iconMirrored: 'birdicons_ovenbird_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.33,
      iconHeight: 0.24,
      mirrored: true,
      iconPosition: {
        top: 1.75,
        left: 0.48,
      },
      labelPosition: {
        bottom: 15,
      },
      haloPosition: {
        left: -0.12,
        top: -0.09,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.3,
      iconHeight: 0.21,
      perchPosition: {
        left: 0.52,
        top: 0.9,
      },
    },
  },
  {
    uuid: '0010',
    name: 'Red-eyed Vireo',
    latinName: 'Vireo olivaceus',
    text: 'Adult Red-eyed Vireos have noticeably red eyes that can only be seen when observing the birds from a close distance. Often heard but not seen, their olive green plumage makes them difficult to spot as they move through trees searching for caterpillars to eat. Sometimes called the “preacher bird,” Red-eyed Vireos can be heard at all hours of the day throughout the summer through even the hottest days.',
    group: 'Powdermill',
    sound: {
      iosNotification: 'red_eyed_vireo_notification.aif',
      androidNotification: 'red_eyed_vireo_notification.mp3',
      filename: 'red_eyed_vireo_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 700,
        },
        {
          type: 'silence',
          length: 700,
        },
        {
          type: 'song',
          length: 700,
        },
        {
          type: 'silence',
          length: 900,
        },
        {
          type: 'song',
          length: 700,
        },
      ],
      chirpLength: 2300,
    },
    images: {
      infoCard: 'redeyedvireo',
      face: 'birdfaces_redeyedvireo',
      icon: 'birdicons_redeyedvireo',
      iconMirrored: 'birdicons_redeyedvireo_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.37,
      iconHeight: 0.25,
      mirrored: false,
      iconPosition: {
        top: 1.97,
        left: 0.05,
      },
      labelPosition: {
        bottom: 20,
      },
      haloPosition: {
        left: -0.15,
        top: -0.1,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.34,
      iconHeight: 0.22,
      perchPosition: {
        left: 0.3,
        top: 0.85,
      },
    },
  },
  {
    uuid: '0011',
    name: 'Louisiana Waterthrush',
    latinName: 'Parkesia motacilla',
    text: 'The Louisiana Waterthrush can be identified by its white eye stripe and the bobbing motion it makes as it forages near fast-rushing streams. Because it feeds solely on aquatic insects, the Louisiana Waterthrush is particularly susceptible to pollution, and its presence (or absence) can be an indicator of stream quality. The genus Parkesia was named after Dr. Kenneth Parkes, who was a Carnegie Museum of Natural History curator of birds for 40 years.',
    group: 'Powdermill',
    sound: {
      iosNotification: 'louisiana_waterthrush_notification.aif',
      androidNotification: 'louisiana_waterthrush_notification.mp3',
      filename: 'louisiana_waterthrush_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 2500,
        },
      ],
      chirpLength: 2500,
    },
    images: {
      infoCard: 'louisianawaterthrush',
      face: 'birdfaces_louisianawaterthrush',
      icon: 'birdicons_louisianawaterthrush',
      iconMirrored: 'birdicons_louisianawaterthrush_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.29,
      iconHeight: 0.28,
      mirrored: true,
      iconPosition: {
        top: 2.09,
        left: 0.61,
      },
      labelPosition: {
        bottom: 13,
      },
      haloPosition: {
        left: -0.15,
        top: -0.05,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.26,
      iconHeight: 0.25,
      perchPosition: {
        left: 0.45,
        top: 0.88,
      },
    },
  },
  {
    uuid: '0012',
    name: 'Tufted Titmouse',
    latinName: 'Baeolophus bicolor',
    text: 'The Tufted Titmouse is a small, gray bird with a head crest and an orangish flank. Their bold, scolding calls can be heard in forests with dense canopies and a wide variety of trees. The Tufted Titmouse builds a cup-shaped nest and can often be spotted at bird feeders in the eastern United States. They eat insects, berries, and large seeds, including acorns and beechnuts.',
    group: 'CMNH',
    sound: {
      iosNotification: 'tufted_titmouse_notification.aif',
      androidNotification: 'tufted_titmouse_notification.mp3',
      filename: 'tufted_titmouse_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 1300,
        },
        {
          type: 'silence',
          length: 1500,
        },
        {
          type: 'song',
          length: 2200,
        },
      ],
      chirpLength: 1300,
    },
    images: {
      infoCard: 'tuftedtitmouse',
      face: 'birdfaces_tuftedtitmouse',
      icon: 'birdicons_tuftedtitmouse',
      iconMirrored: 'birdicons_tuftedtitmouse_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.36,
      iconHeight: 0.26,
      mirrored: false,
      iconPosition: {
        top: 2.28,
        left: 0.14,
      },
      labelPosition: {
        bottom: 23,
      },
      haloPosition: {
        left: -0.15,
        top: 0.05,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.33,
      iconHeight: 0.23,
      perchPosition: {
        left: 0.3,
        top: 0.76,
      },
    },
  },

  {
    uuid: '0013',
    name: 'Swainson\'s Thrush',
    latinName: 'Catharus ustulatus',
    text: 'Swainson’s Thrushes make a distinct peep during their nocturnal migratory flights that can sometimes be mistaken for spring peeper frogs. They sometimes reduce the volume of their songs to sound further away. These birds are often seen high in trees as they search for small insects and berries to eat. Their nests are often lined with horsehair fungus, which may have antibiotic effects.',
    group: 'CMNH',
    sound: {
      iosNotification: 'swainson_s_thrush_notification.aif',
      androidNotification: 'swainson_s_thrush_notification.mp3',
      filename: 'swainson_s_thrush_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 750,
        },
        {
          type: 'silence',
          length: 1200,
        },
        {
          type: 'song',
          length: 200,
        },
        {
          type: 'silence',
          length: 950,
        },
        {
          type: 'song',
          length: 140,
        },
        {
          type: 'silence',
          length: 880,
        },
        {
          type: 'song',
          length: 300,
        },
        {
          type: 'silence',
          length: 900,
        },
        {
          type: 'song',
          length: 2030,
        },
      ],
      chirpLength: 750,
    },
    images: {
      infoCard: 'swainsonthrush',
      face: 'birdfaces_swainsonthrush',
      icon: 'birdicons_swainsonthrush',
      iconMirrored: 'birdicons_swainsonthrush_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.27,
      iconHeight: 0.3,
      mirrored: false,
      iconPosition: {
        top: 2.48,
        left: 0.52,
      },
      labelPosition: {
        bottom: 15,
      },
      haloPosition: {
        left: 0.18,
        top: -0.18,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.24,
      iconHeight: 0.27,
      perchPosition: {
        left: 0.4,
        top: 0.88,
      },
    },
  },
  {
    uuid: '0014',
    name: 'Song Sparrow',
    latinName: 'Melospiza melodia',
    text: 'Found all across the United States, Song Sparrows like to live in open habitats like fields, marsh edges, and backyards. They have distinctive songs that can be quite varied by location, and they can be heard throughout the winter. Females appear to prefer males with complicated songs. Song Sparrows are the most common native bird in Pennsylvania.',
    group: 'Powdermill',
    sound: {
      iosNotification: 'song_sparrow_notification.aif',
      androidNotification: 'song_sparrow_notification.mp3',
      filename: 'song_sparrow_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 3000,
        },
      ],
      chirpLength: 3000,
    },
    images: {
      infoCard: 'songsparrow',
      face: 'birdfaces_songsparrow',
      icon: 'birdicons_songsparrow',
      iconMirrored: 'birdicons_songsparrow_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.3,
      iconHeight: 0.28,
      mirrored: false,
      iconPosition: {
        top: 2.64,
        left: 0.1,
      },
      labelPosition: {
        bottom: 20,
      },
      haloPosition: {
        left: -0.17,
        top: 0,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.27,
      iconHeight: 0.23,
      perchPosition: {
        left: 0.46,
        top: 0.85,
      },
    },
  },
  {
    uuid: '0015',
    name: 'White-throated Sparrow',
    latinName: 'Zonotrichia albicollis',
    text: 'White-throated Sparrows are ground foraging birds commonly found during winter in the eastern United States. They breed in the boreal forests of Canada during the summer, but their songs can be heard in American forests throughout the winter.',
    group: 'BirdSafe',
    sound: {
      iosNotification: 'white_throated_sparrow_notification.aif',
      androidNotification: 'white_throated_sparrow_notification.mp3',
      filename: 'white_throated_sparrow_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 2500,
        },
      ],
      chirpLength: 2500,
    },
    images: {
      infoCard: 'whitethroatedsparrow',
      face: 'birdfaces_whitethroatedsparrow',
      icon: 'birdicons_whitethroatedsparrow',
      iconMirrored: 'birdicons_whitethroatedsparrow_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.32,
      iconHeight: 0.25,
      mirrored: false,
      iconPosition: {
        top: 2.87,
        left: 0.25,
      },
      labelPosition: {
        bottom: 15,
      },
      haloPosition: {
        left: -0.16,
        top: -0.08,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.29,
      iconHeight: 0.2,
      perchPosition: {
        left: 0.4,
        top: 0.9,
      },
    },
  },
  {
    uuid: '0016',
    name: 'Scarlet Tanager',
    latinName: 'Piranga olivacea',
    text: 'Despite what their name implies, female Scarlet Tanagers are greenish yellow birds; Only males are the namesake bright red. Though you can often hear their “chick-burr” call, these birds can be hard to spot because they stay high in the forest canopy where they feed on insects and fruit. Their husky, alto songs are sometimes described as sounding like an American Robin with a sore throat.',
    group: 'CMNH',
    sound: {
      iosNotification: 'scarlet_tanager_notification.aif',
      androidNotification: 'scarlet_tanager_notification.mp3',
      filename: 'scarlet_tanager_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 2200,
        },
      ],
      chirpLength: 2200,
    },
    images: {
      infoCard: 'scarletttanager',
      face: 'birdfaces_scarletttanager',
      icon: 'birdicons_scarletttanager',
      iconMirrored: 'birdicons_scarletttanager_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.27,
      iconHeight: 0.27,
      mirrored: true,
      iconPosition: {
        top: 3.1,
        left: 0.6,
      },
      labelPosition: {
        bottom: 25,
      },
      haloPosition: {
        left: -0.13,
        top: -0.15,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.24,
      iconHeight: 0.24,
      perchPosition: {
        left: 0.5,
        top: 0.75,
      },
    },
  },
  {
    uuid: '0017',
    name: 'Baltimore Oriole',
    latinName: 'Icterus galbula',
    text: 'Baltimore Orioles are known for their brightly colored plumage and their sock-shaped nests that hang from branches. Their whistling song is one of the first heard in spring in eastern North American forests. Baltimore Orioles prefer dark-colored, ripe fruit. They feed by piercing fruit with their beaks, which reflexively open to allow them to easily access what’s inside.',
    group: 'CMNH',
    sound: {
      iosNotification: 'baltimore_oriole_notification.aif',
      androidNotification: 'baltimore_oriole_notification.mp3',
      filename: 'baltimore_oriole_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 2500,
        },
      ],
      chirpLength: 2500,
    },
    images: {
      infoCard: 'baltimoreoriole',
      face: 'birdfaces_baltimoreoriole',
      icon: 'birdicons_baltimoreoriole',
      iconMirrored: 'birdicons_baltimoreoriole_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.47,
      iconHeight: 0.22,
      mirrored: false,
      iconPosition: {
        top: 3.3,
        left: 0.07,
      },
      labelPosition: {
        bottom: 15,
      },
      haloPosition: {
        left: -0.1,
        top: -0.05,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.43,
      iconHeight: 0.17,
      perchPosition: {
        left: 0.4,
        top: 0.84,
      },
    },
  },
  {
    uuid: '0018',
    name: 'Wood Thrush',
    latinName: 'Hylocichla mustelina',
    text: 'Wood Thrushes are regularly heard, but their warm brown color can make them hard to spot in eastern forests, where they spend their summers. Their songs are particularly unique because thrushes can sing “internal duos” by hitting two notes at once. Wood Thrush populations are in steep decline due to human activity.',
    group: 'BirdSafe',
    sound: {
      iosNotification: 'wood_thrush_notification.aif',
      androidNotification: 'wood_thrush_notification.mp3',
      filename: 'wood_thrush_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 2000,
        },
      ],
      chirpLength: 2000,
    },
    images: {
      infoCard: 'woodthrush',
      face: 'birdfaces_woodthrush',
      icon: 'birdicons_woodthrush',
      iconMirrored: 'birdicons_woodthrush_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.41,
      iconHeight: 0.26,
      mirrored: true,
      iconPosition: {
        top: 3.5,
        left: 0.55,
      },
      labelPosition: {
        bottom: 15,
      },
      haloPosition: {
        left: -0.11,
        top: -0.02,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.37,
      iconHeight: 0.22,
      perchPosition: {
        left: 0.3,
        top: 0.9,
      },
    },
  },
  {
    uuid: '0019',
    name: 'Yellow-bellied Sapsucker',
    latinName: 'Sphyrapicus varius',
    text: 'Yellow-bellied Sapsuckers are small woodpeckers with red foreheads and small crests. The neat rows of holes they drill while searching for tree sap can be seen in eastern hardwood and coniferous forests. Their sap wells sometimes attract hummingbirds, bats, and even porcupines.',
    group: 'BirdSafe',
    sound: {
      iosNotification: 'yellow_bellied_sapsucker_notification.aif',
      androidNotification: 'yellow_bellied_sapsucker_notification.mp3',
      filename: 'yellow_bellied_sapsucker_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 6500,
        },
      ],
      chirpLength: 2000,
    },
    images: {
      infoCard: 'yellowbelliedsapsucker',
      face: 'birdfaces_yellowbelliedsapsucker',
      icon: 'birdicons_yellowbelliedsapsucker',
      iconMirrored: 'birdicons_yellowbelliedsapsucker_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.27,
      iconHeight: 0.36,
      mirrored: false,
      iconPosition: {
        top: 3.58,
        left: 0.1,
      },
      labelPosition: {
        bottom: 55,
      },
      haloPosition: {
        left: -0.12,
        top: -0.05,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.24,
      iconHeight: 0.33,
      perchPosition: {
        left: 0.2,
        top: 0.55,
      },
    },
  },
  {
    uuid: '0020',
    name: 'Blue Jay',
    group: 'CMNH',
    latinName: 'Cyanocitta cristata',
    text: 'Known for their bright color and intelligence, Blue Jays are found near the edges of forests across the eastern United States. These birds are very social and are often found in small, noisy groups. Blue Jays make a variety of noises and often imitate other animals like hawks, cats, and even humans. Like any other blue bird, their bright color is caused by the reflective structure of their feathers, not pigments.',
    sound: {
      iosNotification: 'blue_jay_notification.aif',
      androidNotification: 'blue_jay_notification.mp3',
      filename: 'blue_jay_loop.mp3',
      soundSections: [
        {
          type: 'song',
          length: 700,
        },
        {
          type: 'silence',
          length: 1400,
        },
        {
          type: 'song',
          length: 500,
        },
        {
          type: 'silence',
          length: 1000,
        },
        {
          type: 'song',
          length: 750,
        },
        {
          type: 'silence',
          length: 900,
        },
        {
          type: 'song',
          length: 750,
        },
        {
          type: 'silence',
          length: 930,
        },
        {
          type: 'song',
          length: 500,
        },
      ],
      chirpLength: 3000,
    },
    images: {
      infoCard: 'bluejay',
      face: 'birdfaces_bluejay',
      icon: 'birdicons_bluejay',
      iconMirrored: 'birdicons_bluejay_mirrored',
    },
    aboutScreenConstants: {
      iconWidth: 0.5,
      iconHeight: 0.28,
      mirrored: false,
      iconPosition: {
        top: 3.85,
        left: 0.16,
      },
      labelPosition: {
        bottom: 15,
      },
      haloPosition: {
        left: -0.09,
        top: -0.08,
      },
    },
    alarmScreenConstants: {
      iconWidth: 0.44,
      iconHeight: 0.24,
      perchPosition: {
        left: 0.35,
        top: 0.88,
      },
    },
  },
];

export { birds as default };
