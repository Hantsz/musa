var songs = [
    "./songs/06 - Miina Härma - koorilaul _Meeste laul_.mp3",
    "./songs/08 - Aleksander Läte - koorilaul _Kuldrannake_.mp3",
    "./songs/10 - Mihkel Lüdig - koorilaul _Koit_.mp3",
    "./songs/11 - Artur Kapp - oratoorium _Hiiob_, koor _Suur oled Sa!_.mp3",
    "./songs/12 - Artur Kapp - soololaul _Metsateel_.mp3",
    "./songs/14 - Mart Saar - koorilaul _Põhjavaim_.mp3",
    "./songs/17 - Heino Eller - _Kodumaine viis_, keelpilliorkestrile.mp3",
    "./songs/20 - Gustav Ernesaks - koorilaul _Hakkame mehed minema_.mp3",
    "./songs/21 - Gustav Ernesaks - koorilaul _Mu isamaa on minu arm_.mp3",
    "./songs/23 - Veljo Tormis - koorilaul _Ühtehoidmiselaul_.mp3",
    "./songs/24 - Veljo Tormis - _Jaani hobu_, V osa kooritsüklist _Eesti kalendrilaulud_.mp3",
    "./songs/25 - Eino Tamberg - _Concerto grosso_, I osa.mp3",
    "./songs/28 - Raimo Kangro - _Arcus_ (_Vibu_) sümfooniaorkestrile (katkend).mp3",
    "./songs/30 - Erkki-Sven Tüür - _Ostium_ (_Uks_).mp3",
    "./songs/31 - Erkki-Sven Tüür - _Spectrum I_, orelile.mp3",
    "./songs/32 - Urmas Sisask - Missa nr. 3 _Eesti missa_, osa _Sanctus_.mp3",
    "./songs/34 - Toivo Tulev - _Der Herr ist mein getreuer Hirt, II_ (_Issand on minu ustav karjane_).mp3",
    "./songs/35 - Mart Siimer - koorilaul _Homme_.mp3",
    "./songs/01 - Uuem eesti rahvalik laul (liedertafellik laul) - _Mu isamaa armas_.mp3",
    "./songs/02 - Aleksander Saebelmann-Kunileid - koorilaul _Mu isamaa on minu arm_.mp3",
    "./songs/03 - Aleksander Saebelmann-Kunileid - koorilaul _Sind surmani_.mp3",
    "./songs/04 - Friedrich August Saebelmann - koorilaul _Kaunimad laulud.mp3",
    "./songs/07 - Miina Härma - koorilaul _Tuljak_.mp3",
    "./songs/13 - Mart Saar - soololaul _Must lind_.mp3",
    "./songs/15 - Cyrillus Kreek - koorilaul _Õnnis on inimene_, koorilaulude kogumikust _Taaveti laulud_.mp3",
    "./songs/16 - Cyrillus Kreek - koorilaul _Sirisege, sirisege sirbikesed_.mp3",
    "./songs/33 - Urmas Sisask -  klaveritsükkel _Tähistaeva tsükkel lastele_, 2. pala _Kassiopeia_.mp3",
    "./songs/09 - Rudolf Tobias - oratoorium _Joonase lähetamine_, osa _Sanctus_ (Püha).mp3",
    "./songs/18 - Heino Eller - klaveripala _Liblikas_.mp3",
    "./songs/19 - Eduard Tubin - sümfooniline süit balletist _Kratt_.mp3",
    "./songs/22 - Villem Kapp - kooripoeem _Põhjarannik_.mp3",
    "./songs/26 - Arvo Pärt - _Credo_ (_Usutunnistus_) segakoorile, klaverile ja orkestrile.mp3",
    "./songs/27 - Arvo Pärt - _Fratres_ (_Vennad_) viiulile, keelpilliorkestrile ja löökriistadele.mp3",
    "./songs/29 - Lepo Sumera - klaveriteos _Pala aastast 1981_, 2. pala _..._.mp3",
    "./songs/36 - Pärt Uusberg - koorilaul _Muusika_.mp3",
    "./songs/05 - Karl August Hermann - koorilaul _Isamaa mälestus_.mp3"
];

        var currentSongIndex;
        var timeoutId;

        let currentIndex = -1;
        let playedIndexes = [];

        function playRandomSong() {
            var songName = document.getElementById("song-reveal");
            songName.style.opacity = 0;
            if (playedIndexes.length === songs.length) {
                playedIndexes = [];
            }
            let randomIndex = Math.floor(Math.random() * songs.length);
            while (playedIndexes.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * songs.length);
            }
            playedIndexes.push(randomIndex);
            var audio = document.getElementById("musicPlayer");
            currentSongIndex = randomIndex;
            audio.src = songs[currentSongIndex];
            audio.currentTime = 0;

            audio.onloadedmetadata = function() {
                var randomStartTime = Math.floor(Math.random() * (audio.duration - 30));
                while (randomStartTime >= audio.duration) {
                    randomStartTime = Math.floor(Math.random() * (audio.duration - 30));
                }
                audio.currentTime = parseFloat(randomStartTime);

                document.getElementById("song-reveal").style.display = "none";

                audio.oncanplaythrough = function() {
                    audio.play();
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => { audio.pause(); }, 30000);
                };
            };
        }

        function revealSongName() {
            var songName = document.getElementById("song-reveal");
            songName.style.display = "block";
            songName.innerHTML = songs[currentSongIndex].replace(".mp3", "").slice(12).replace(/_/g, '"');;
            songName.style.opacity = 0;
            setTimeout(() => {
                songName.style.opacity = 1;
            }, 10);
            var songNameHeight = songName.scrollHeight;
            songRevealContainer.style.height = songNameHeight + 'px';
        }
