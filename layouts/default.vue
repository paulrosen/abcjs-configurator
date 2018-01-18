<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{appTitle()}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 <a href="https://paulrosen.net">Paul Rosen</a>, used with <a href="https://abcjs.net">abcjs</a>.</span>
    </v-footer>
  </v-app>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'home', title: 'Home', to: '/' },
          { icon: 'audiotrack', title: 'Visual', to: '/visual' },
          { icon: 'volume_mute', title: 'Audio', to: '/audio' },
          { icon: 'edit', title: 'Interactive', to: '/interactive' },
	        { icon: 'directions_run', title: 'Animation', to: '/animation' },
	        { icon: 'style', title: 'Classes', to: '/classes' },
          { icon: 'pie_chart', title: 'Analysis', to: '/analyze' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: this.appTitle()
      }
    },
	  methods: {
		  ...mapGetters(['appTitle']),
		  ...mapMutations(['setRoute']),
		  ...mapActions(['initializeAbcjs']),
	  },
      mounted() {
	      this.setRoute(this.$route.name);
	      document.title = this.appTitle();

	      this.initializeAbcjs(`
X: 22
T:Cats and Birds
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:4/4
L:1/8
Q:1/2=112
R:old-time
K:C
|:GA|"C"c2Bc A2G2|"Am"E2EG E2C2|"F"F2FG A2F2|"G7"GABG ABGA|
"C"c2Bc A2G2|"Am"E2EG E2EG|"G7"FGAc ded2|1"C"c2ccc2:|2"C"c2cc c2 c2||
|:"Am"e2eg ageg|abag age2|"F"f2fg aga2|"G"g2ga geBd|
"Am"e2eg ageg|abag age2|"G"gega ged2|"C"c2ccc2c2:|

X: 24
T:Clouds Thicken
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:6/8
L:1/8
Q:1/2=112
R:Creepy Jig
K:Em
|:"Em"EEE E2G|"C7"_B2A G2F|"Em"EEE E2G|"C7"_B2A "B7"=B3|"Em"EEE E2G|
"C7"_B2A G2F|"Em (Am7)"GFE "D (Bm7)"F2D|1"Em"E3-E3:|2"Em"E3-E2B|:"Em"e2e gfe|
"G"g2ab3|"Em"gfeg2e|"D"fedB2A|"Em"e2e gfe|"G"g2ab3|"Em"gfe"D"f2d|"Em"e3-e3:|

X: 23
T:Cooking the Goose
M:4/4
L:1/8
Q:1/2=120
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:old time
K:D
"D"DEFA BAFA| d2ff ef3| DEFA "G"BAFB|"A"AFE2 "D"D4|
DEFA BAFA| d2ff ef3| "G"fedf edBA| "A7"FDE2 "D"D4:|
|:"D"fedf ef3|"G"BAFB AB3|"D"fedf "G"edBA| "A"FDE2 "D"D4:|

X: 25
T:Critter's Gone to Texas
M:4/4
L:1/8
Q:1/2=116
C:Paul Rosen
S:Copyright 2008, Paul Rosen
R:old time
K:C
ef|:"C"g2g2 a3a|ge3- e2 ef|g2g2 a2ag|"G7"f4-f2ff|f2ff d2dd|B2BB G4|
f2f2 edB2|1"C"c6ef:|2"C"c6cB[|:"Am"AE2E E2EE|GE2E E2EE|"G"D2DE DCB,2|"Am"A,2A,A, A,2A,A,|
"G"G,2B,2 D2E2|GABc d2dd|f2f2 edB2|1"C"c6cB:|2"C"c6ef||

X: 26
T:Dancing Susan
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:6/8
L:1/8
Q:1/2=112
R:Circus Jig
K:D
"D"dcd f2d|B2A F2A|"Em"BAG B2G|"A7"cBA c2A|"D"dcd f2d|B2A F2A|"G"B2c "A7"edc|"D"d3 d3:|
|:"B7"Bc^d Bcd|"E7"e2f ^g3|"A"a^ga bag|"A7"a2e c2e|"D"dcd f3|"G"dcd g3|"A7"B2c edc|"D"d3 d3:|
T: Harmony (by Rya Martin)
"D"fef a2f|d2=cA2c|"Em"d=cB d2B|"A7"edc e2c|"D"fef a2f|d2=cA2c|"G"d2e "A7"gfe|"D"f3f3:|
|:"B7"^def def|"E7"^g2a b3|"A"c'bc' d'c'b|"A7"c'2g e2g|"D"fef a2f|"G"bab d'2b|"A7"g2a gfe|"D"f3 f3:|

X: 27
T:East of Avon
C:Paul Rosen
S:Copyright 2004, Paul Rosen
M:6/8
L:1/8
Q:1/2=108
R:Renaissance Jig
K:Aphrygian
"Am"A,2C B,A,G,|"C7"C2E GAB|"F"c2A "Gm"BAG|"Dm"FGF"C"E3|
"Dm"A,2D "C"EDC|"Dm"D2F "Gm"GAB|"Am"cBA"Em"G2E|[1"Am"A3E3:|[2"Am"A3c3|
|:"Dm"d2e fed|"Am7"gfe "Dm"fed|dfe dcA|"Gm"BcB"Am"A3|
"Dm"d2e fed|"Am7"gfe "Dm"fed|"Am"cdc "Em"AGE|[1"Am"A3c3:|[2"Am"A3E3|

X: 28
T:Elgin Rag
C:Paul Rosen
S:Copyright 2004, Paul Rosen
M:4/4
L:1/8
Q:1/2=112
R:Ragtime
K:C
"C"GAcG AcGA|"Ab"_e2_e2c4|"G"d2AB2 AG2|d2d2 BAG2|"C"GAcG AcGA|"Ab"_e2_e2c4|
"G"d2ef2ed2|1"C"c8:|2"C"c6eg|:"A7"aege fe^c2|"Dm"dfedA2A2|"G7"BABc dBG2|
"C"cBAG E4|"A7"aege fe^c2|"Dm"dfed A2A2|"G7"BABc dBG2|1"C"c6eg:|2"C"c8||
T:Harmony
"C"cdec decd|"Ab"_a2_a2_e4|"G"g2de2 dB2|g2g2 dcB2|"C"cdec decd|"Ab"_a2_a2_e4|
"G"g2ab2gf2|1"C"e8:|2"C"e6ab||:"A7"c'aba age2|"Dm"fagfd2d2|"G7"dcde gdB2|
"C"edcB G4|"A7"c'aba age2|"Dm"fagfd2d2|"G7"dcde gdB2|1"C"e6ab:|2"C"e8||

X: 29
T:First Street
M:4/4
L:1/8
Q:1/2=120
C:Paul Rosen
S:Copyright 2004, Paul Rosen
R:Old Time
K:Am
"A"e2gge2g2|a2gge2ee|e2gge2dd|"E"B2BBB2BB|"A"e2gge2g2|a2gge2ee|
eged "G"BAG2|"A"A8:|]|:"F"F2FGA2AB|"Am"c2B2A4|"G"G2GABAG2|
"E"E8|"F"F2FGA2AB|"Am"c2d2e4|eged "G"BAG2|"Am"A8:|

X: 31
T:Green Light
M:4/4
L:1/8
Q:1/2=112
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:Reel
K:Em
"Em"E2EG (ED)B,E|e2"D"d4Bd|"Am (C)"(AB)AG (FD)FG|(AB)AG "D"(FE)DF|
"Em"E2EG (ED)B,E|e2 d4(ef|"C"gf)ed "Bm7 (D)"(BA)Bd|1"Em"e4e3G:|2"Em"e4e2(ef||
|:"Em"(gf)ed (Bd)(ef|"D"af)ef (af)(ef|"Em"gf)ed (Bd)(ef|"Bm"g.)d.f.d. e.d.ef|
"Em"(gf)ed (Bd)(ef|"D"af)ef (af)ef|"Am7 (C7)"b2a2 (fe)d2|1"B"(ef)ed (Bd)(ef:|2"B"(ef)ed (BA)FF|

X: 32
T:Locust Tree
C:Paul Rosen
S:Copyright 2004, Paul Rosen
M:4/4
L:1/8
Q:1/2=108
R:playful, yet upright
K:A
"A"EAcBA2AB|"D"cdef"E7"e2c2|"A"EAcBA2fa|"D"fec2"E"B4|"A"EAcBA2AB|
"F#m"cdefe2c2|"Bm (D)"efec BAFA|"E"EcB2"A"A4:||:"D"f2a2d4|fedef4|"A"edc2"(F#m)"edc2|
"D"faec"E"B4|"A"A2cBA2cd|e2f2e4|"D"efec BAFA|"E7"EcB2"A"A4:|
T:Harmony
"A"Acedc2cd|"D"efab"E7"a2e2|"A"Acedc2ac'|"D"aae2"E"d4|"A"Acedc2cd|
"F#m"efaba2e2|"Bm (D)"abae dcAc|"E"Ged2"A"c4:||:"D"a2d'2f4|agfg a4|"A"afe2"(F#m)"afe2|
"D"ad'ae"E"d4|"A"c2edc2ef|a2b2a4|"D"abae dcAc|"E7"Ged2"A"c4:|

X: 33
T:Lulu's Farewell
M:4/4
L:1/8
Q:1/2=116
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:Driving Contradance
K:Dmixolodian
"D"D2F2G2FG|AcAG FGAF|D2F2G2A2|"Am"dcAd- dcAF|D2F2G2FG|AcAG FGAc|
"G"dcAG- GAF2|"D"D2DD D2DD:|]|:"D"dcAc- "(C)"cAGc|AcAG FGAc|"D"dcAc- "(C)"cAGc|
AcAG AcAG|"D"dcAc- "C"cAGc|AcAG FGAc|"G"dcAG- GAF2|"D"D2DD D2DD:|

X: 34
T:Mama's Fire
M:4/4
L:1/8
Q:1/2=112
C:Paul Rosen
S:Copyright 2006, Paul Rosen
R:klezmer
K:Dm
ABA|:"Dm"d2^cd "A"e2 de|"Dm"fedf "A"e ABA|"Dm"d^cde fed^c|"Gm"B4G ABA|
"Dm"d2^cd "A"e2 de|"Dm"fedf "Edim"e2fg|"A"afdg fe^ce|1"Dm"d2A2 d ABA:|2"Dm"d2A2 d2f^g|
|:"Dm"a2f2 "C"=g3e|"Dm"fed2 d2f^g|a^gfa "C"=g2e2|"Bb"fedf"A7"e2 f^g|"Dm"a2f2 "Gm"=g3e|
"Dm/A"fed2 "Bb"f2f^g|"A7"afd^g fe^ce|1"Dm"d2A2 d2f^g:|2"Dm"d2A2 d||

X: 35
T:Mollie's Garden
M:3/4
L:1/8
Q:3/4=40
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:Waltz
K:D
"D"a6|f6|"G"g3f ed|B4cB|"A7"A4AB|c2e2a2|"D"g6|f6|"D"a6|"(Bm)"f6|"G"g3f ed|"(Em)"B4cB|
"A7"A4AB|c2e2A2|"D"d6-|d4 dc||"Bm"B4Bc|d2e2g2|f6|d6|"A7"e4 ef|
e2d2e2|"D"f6-|f4 dc|"Bm"B4Bc|d2e2g2|f6|"B7"a6|"Em"e4 ef|"A7"g2e2A2|"D"d6-|d6:|

X: 36
T:Money Lost
M:3/4
L:1/8
Q:3/4=40
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:Klezmer
K:Dm
Ade|:"Dm"(f2d)e gf|"A7"e2^c4|"Gm"B>>^c BA BG|"A"A3Ade|"Dm"(f2d)e gf|"A7"e2^c4|
"Gm"A>>B "A7"AG FE|1"Dm"D3Ade:|2"Dm"D3DEF||:"Gm"(G2D)E FG|"Dm"A2F4|"Gm"B>>c "A7"BA BG|
"Dm"A3 DEF|"Gm"(G2D)EFG|"Dm"A2F4|"A7 (Edim)"E>>Fx "(A7)"ED^C2|1"Dm"D3DEF:|2"Dm"D6||
T:Harmony
dfg|:"Dm"(a2f)g ba|"A7"g2e4|"Gm"d>>e d^c dB|"A"^c3dfg|"Dm"(a2f)g ba|"A7"g2e4|
"Gm"d>>e "A7"dB AG|1"Dm"F3dfg:|2"Dm"F3FGA||:"Gm"(B2F)G AB|"Dm"d2A4|"Gm"d>>e "A7"dc dB|
"Dm"d3 FGA|"Gm"(B2F)GAB|"Dm"d2A4|"A7 (Edim)"G>>Ax "(A7)"GFE2|1"Dm"F3FGA:|2"Dm"F6|

X: 37
T:Mont Bleu
M:4/4
L:1/8
Q:1/2=112
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:French Canadian
K:G
"G"DGGG "Am7"EGGG| DGAB "Am"cBAG| "G"DGAB "C"cde2| "D"(d^c)de d2d2|
"G"DGGG EGGG|DGAB "Am"cBA2| "C"u(ge)fd "A7 (C#dim7)"(ed)^cd|"D"(cA)FA "G"G2G2:|
|:"D"A2A2 BAFB|ABde f2d2|"A7"gece Aceg|ageg a2 e2|
"D"A2A2 BAFB|ABde f2d2|"A"gfed cdec|1"D"dzdc d4\\
:|2[K:G]"D7"dcAG FGAF|]

X: 38
T:Persian Cat
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:4/4
L:1/8
Q:1/2=112
R:old time
K:Ador
|:"Am"A,2A,A, A,2A,A,|"C"(CB,)A,C "G"(B,A,)G,B,|"Am"A,2A,A, A,2A,A,|"C"C2EG "Em"(AG)ED|
"Am"A,2A,A, A,2A,A,|"C"(CB,)A,C "G"(B,A,)G,B,|"Em"(ED)CE (DC)B,G,|"Am"A,2A,A, A,2A,A,:|
K:Amix
|:"A"A2cd e2ef|(gf)eg (fe)cc|A2cd e2ee|"G"(ge)dd (ge)dd|
"A"A2cd e2ef|gfe2 c4|[K:Am]"Am"(cd)cA "G"(BA)GG|"Am"A2AA A2AA:|

X: 39
T:Pretty Little Liza
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:4/4
L:1/8
Q:1/2=106
R:old time
K:Am
"Am"A2AA c2dd|e2eg e2dc|A2AA c2dd|e2cc A2cc|"Em (G)"B2BB B2BB|
B2BB B2BB|"Am"A2AA c2dd|e2eg e2c2|"D"d2dd d2dd|d2dd d2cd|
"Am"e2cc A2c2|"G"BAG2 BAG2|"Am"A2AA A2AA|A2AA A2AA|:"Am"e4 a3e|"G"g2d2- d2eg|
"Am"a2aa ged2|"Em"e2ee e2ee|"Am"e4 a3e|"G"g2d2- d2Bc|"Em"d2e2 dcB2|"Am"A2AA A2AA:|

X: 30
T:Reel du Chien de Chasse
C:Paul Rosen
S:Copyright 2004, Paul Rosen
M:4/4
L:1/8
Q:1/2=112
R:French Canadian
K:D
|:"D"!accent!vaf!accent!ff "G"g!accent!ee!accent!f|"Em"g!accent!bg!accent!b !accent!e2!accent!e2|\\
"G"g!accent!bg!accent!b "D"!accent!ag!accent!f2|"Em"g!accent!fe!accent!d "A"!accent!cA!accent!(A2|
"D"!accent!a)f!accent!ff "G"g!accent!ee!accent!f|"Em"g!accent!bg!accent!b !accent!e2!accent!e2|\\
"G"g!accent!fe!accent!d "A"!accent!cA!accent!AB|"D"d2d2d2z2:|
|:"D"vAFFD (F/G/FD)F|dBAG (F/G/FD)F|dBAG (F/G/FA)B|"A"(cd)ec"D"d2z2:|
|:"D"fddA (B/d/BA)A|(F/G/F D2) (F/G/F D2)|fddA "G"(B/d/B A)A|"A"(cd)ec"D"d2z2:|

X: 40
T:Reunion
M:4/4
L:1/8
Q:1/2=112
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:dreamy
K:Am
"Am"A4e4|"G"g2e2dBG2|"F"c2cdc2A2|"G"BcB2A2G2|"Am"A2e2e^fe2|"G"g2e2dBG2|
"F"c2cdc2A2|"G"B8:||:"Am"e2a6|"G"b2g2g^fg2|"Am"e2a2aba2|
"G"g2e2d2e2|"Am"e2a6|"G"b2g2g^fg2|"Am"e2a2aba2|"G"g2e2d2B2:|

X: 41
T:Riverside
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:4/4
L:1/8
Q:1/2=120
R:old time
K:G
|:"G"b4 g4|d4- d2AB|"D"cBcB A2AB|cBcB A4|"G"b4 g4|
d4- d2AB|"D"cBcB A2F2|[1"G"G2GG G2GG:|[2"G"G2GG G2AB|:"D"cBcB A2AB|
cBcB A4|"G"d2dd B2Bc|dcdc B2dd|"C"e3g e2AB|"D"cBAF "G"G2GG:|

X: 42
T:Shaky Junction
M:4/4
L:1/8
Q:1/2=112
C:Paul Rosen
S:Copyright 2005, Paul Rosen
R:Driving Ethnic
K:Gm
"Gm".GDFDE2DG-|.GDFDE2DD-|"D7"D=E^FGA3A|A>BAG^F2D2|
"Gm".GDFDE2DG-|.GDFDE2DD-|"D7"D=E^FG ABAF|1"Gm"G3GG2GG:|2"Gm"G3GG2Bc|
|:"Gm"d2Bc- cBGG|"D7"A>BAG^F2D2|"Gm"d2Bc- cBGB|"Cm"e2e2"Gm"d4|
d2Bc- cBGG|"D7"A>BAG^F2DD-|D=E^FG ABAF|"Gm"G3GG2GG:|
T:Harmony
"Gm".BGAGG2GB-|.BGAGG2GF-|"D7"FGABc3c|c>dcBA2^F2|
"Gm".BGAGG2GB-|.BGAGG2GF-|"D7"FGABcdcA|"Gm"B3BB2BB:|
|:"Gm"g2de- edBB|"D7"c>dcBA2^F2|"Gm"g2de- edBB|"Cm"g2g2"Gm"g4|
g2de- edBB|"D7"c>dcBA2^F^F-|FGABcdcA|"Gm"B3BB2BB:|

X: 43
T:Sweet and Sour Rag
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:4/4
L:1/8
Q:1/2=112
R:Rag
K:D
|:"D"fded BdAB|defa- a2aa|"A7"gecA BA-A2|gecA BA-A2|
"D"fded BdAB|defa- a2aa|"A7"gecA BABA|"D"d2dd d2dd:|
|:"D"DEFD EF-F2|EDEF-F4|"E7"EF^GE FG-G2|FEF^G-G4|
"A7"ABcA Bc-c2|BABc-c2BA|1"D"d2d2c2c2|BAB2A2A2:|2"D"d2d2 fdec|d4d4|

X: 44
T:The Bridge
M:4/4
L:1/8
Q:1/2=112
C:Paul Rosen
S:Copyright 2006, Paul Rosen
R:Old-Time
K:A mixolidian
|:"A"ea2e a2ef|gfed cA3|ea2e a2ef|gfed "E"e2ee|
"A"ea2e a2ef|gfed cA3|"G"gfed cAEG |"A"Acdc A2 AA:|
"A"cdcA EGA2| cdcA cdcA|cdcA EGAc|"G"c/2d/2cAG "A"A2AA|
 cdcA EGA2| cdef gfe2|"G"gfed cAEG |"A"Acdc A2 AA:|

X: 45
T:Whistlin' Josie
M:4/4
L:1/8
Q:1/2=112
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:Rag
K:G
"G"D2G2 DEGB|d2B2GD-D2|"C"CDEC DE2E|GGEG- GGG2|"G"D2G2 DEGB|
d2B2GD-D2|"A7"A,B,^CD EFG2|"D7"AGAB AGFE|"G"D2G2 DEGB|d2B2GD-D2|
"C"CDEC DE2E|GGEG- GGG2|"C"cBcd eg-gf|"G"ed^cd- d4|"D7"=cA-AF DEF2|
"G"G6 Bc||"G"d2Bc d2gf|ed2d- d2AB|"C"cBce- "A7"ed^c2|"D7"d6Bc|"G"d2Bc d2gf|
ed2d- d4|"A7"eg2e gab2|"D7"a2aa a2Bc|"G"d2Bc d2gf|ed2d- d2AB|
"C"cBce- "A7"ed^c2|"D7"d8|"C"cBcd eg-gf|"G"ed^cd- d4|"D7"=cA-AF DEF2|"G"G8||
`);
      }
  }
</script>

<style>
  .card {
    margin-bottom: 10px;
  }
  .card__title {
    font-weight: bold;
  }
  code {
    font-family: "Lucida Console", Monaco, monospace;
    background-color: #DFDBC3;
    color: #333333;
    padding: 10px;
    font-size: 16px;
  }
  code::before {
    content:""
  }
	.string {
		font-family: "Lucida Console", Monaco, monospace;
		padding: 10px;
		border-radius: 4px;
		overflow: auto;
	}
  .btn-toggle {
    margin-right: 10px;
  }

</style>