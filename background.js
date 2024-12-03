const outerWildsMusic = {
    tracks: [
        {
            title: "Timber Hearth",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/bsanvezysj/01.%20Timber%20Hearth.mp3"
        },
        {
            title: "Outer Wilds",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/mrzewxqsok/02.%20Outer%20Wilds.mp3"
        },
        {
            title: "The Museum",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/vtufmodpms/03.%20The%20Museum.mp3"
        },
        {
            title: "Space",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/wvbkunihok/04.%20Space.mp3"
        },
        {
            title: "Castaways",
            url: "https://downloads.khinsider.com/game-soundtracks/album/outer-wilds-original-soundtrack/05.%2520Castaways.mp3"
        },
        {
            title: "The Sun Station",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/ztzlcvnqxs/06.%20The%20Sun%20Station.mp3"
        },
        {
            title: "Main Title",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/tbuqhxiuyd/07.%20Main%20Title.mp3"
        },
        {
            title: "The Search",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/chunwdedlg/08.%20The%20Search.mp3"
        },
        {
            title: "The Uncertainty Principle",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/lqcsfnizxu/09.%20The%20Uncertainty%20Principle.mp3"
        },
        {
            title: "End Times",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/msflwqkksn/10.%20End%20Times.mp3"
        },
        {
            title: "22 Minutes",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/ymuzidmyyi/11.%2022%20Minutes.mp3"
        },
        {
            title: "The Nomai",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/bosqnpwgrn/12.%20The%20Nomai.mp3"
        },
        {
            title: "The Ash Twin Project",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/rqpgfwxdld/13.%20The%20Ash%20Twin%20Project.mp3"
        },
        {
            title: "Dark Bramble",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/lxafzuiukm/14.%20Dark%20Bramble.mp3"
        },
        {
            title: "Giant's Deep",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/rgutgaskfi/15.%20Giant%27s%20Deep.mp3"
        },
        {
            title: "Nomai Ruins",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/wvmocwgmdw/16.%20Nomai%20Ruins.mp3"
        },
        {
            title: "Final Voyage",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/wfjhakxkbj/17.%20Final%20Voyage.mp3"
        },
        {
            title: "The Ancient Glade",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/blnhygehrr/18.%20The%20Ancient%20Glade.mp3"
        },
        {
            title: "Curiosity",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/cnhlwrwdis/19.%20Curiosity.mp3"
        },
        {
            title: "Travelers",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/bjjxzlavez/20.%20Travelers.mp3"
        },
        {
            title: "Let There Be Light",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/zngvagnomv/21.%20Let%20There%20Be%20Light.mp3"
        },
        {
            title: "14.3 Billion Years",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/grjbirfilh/22.%2014.3%20Billion%20Years.mp3"
        },
        {
            title: "Morning",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/hocnfjkolx/23.%20Morning.mp3"
        },
        {
            title: "Campfire Song",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/zodcfnibrg/24.%20Campfire%20Song.mp3"
        },
        {
            title: "Into the Wilds",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/qymvlweukg/25.%20Into%20the%20Wilds.mp3"
        },
        {
            title: "Arrow of Time",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/kuxadfqoas/26.%20Arrow%20of%20Time.mp3"
        },
        {
            title: "We Habve Liftoff",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/tisrntkcct/27.%20We%20Have%20Liftoff.mp3"
        },
        {
            title: "A Terrible Fate",
            url: "https://vgmsite.com/soundtracks/outer-wilds-original-soundtrack/iomkmdhlij/28.%20A%20Terrible%20Fate.mp3"
        }
    ]
};

let isPlaying = false;
let currentTrackIndex = 0;
let isShuffled = false;
let shuffledPlaylist = [];
let selectedTrackIndices = new Set(Array.from({ length: outerWildsMusic.tracks.length }, (_, i) => i));

const getShuffledPlaylist = () => {
    return [...outerWildsMusic.tracks]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

const getNextTrack = () => {
    const playlist = isShuffled ? shuffledPlaylist : outerWildsMusic.tracks;
    let nextIndex = currentTrackIndex;
    do {
        nextIndex = (nextIndex + 1) % playlist.length;
    } while (!selectedTrackIndices.has(nextIndex) && nextIndex !== currentTrackIndex);
    
    currentTrackIndex = nextIndex;
    return playlist[currentTrackIndex];
}

let currentTrack = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch(message.action) {
        case 'play':
            isPlaying = true;
            if (!currentTrack) {
                currentTrack = isShuffled ? shuffledPlaylist[currentTrackIndex] : outerWildsMusic.tracks[currentTrackIndex];
            }
            sendResponse({ track: currentTrack });
            break;
        case 'pause':
            isPlaying = false;
            sendResponse({ success: true });
            break;
        case 'next':
            currentTrack = getNextTrack();
            sendResponse({ track: currentTrack });
            break;
        case 'toggleShuffle':
            isShuffled = !isShuffled;
            if (isShuffled) {
                shuffledPlaylist = getShuffledPlaylist();
                currentTrackIndex = 0;
                currentTrack = shuffledPlaylist[currentTrackIndex];
            } else {
                currentTrack = outerWildsMusic.tracks[currentTrackIndex];
            }
            sendResponse({ track: currentTrack });
            break;
        case 'getTracks':
            sendResponse({ tracks: outerWildsMusic.tracks });
            break;
            
        case 'updateSelectedTracks':
            selectedTrackIndices = new Set(message.selectedTracks);
            if (!selectedTrackIndices.has(currentTrackIndex)) {
                currentTrack = getNextTrack();
            }
            break;
    }
    return true;
});