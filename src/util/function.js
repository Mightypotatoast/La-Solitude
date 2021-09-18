
module.exports = {

    attachIsImage : function ( url ) {

        let suffixe = [ "png","jpg","gif","gifv","webp","jpeg","mp4", "webm", "wav", "mp3", "ogg", "flac" ]

            suffixe.forEach( element => {

                if (url.indexOf( "." + element, url.length - ( element.length + 1 ) ) !== -1) {
                    return true;
                } else {
                    return false;
                }

            });
    }




}