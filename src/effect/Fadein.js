
mofron.effect.Fadein = class extends mofron.effect.Base {
    effect (flg) {
        try {
            if (true === flg) {
                $('#' + this.tgt_obj.getId()).fadeIn(this.speed);
            } else {
                $('#' + this.tgt_obj.getId()).fadeOut(this.speed);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}

