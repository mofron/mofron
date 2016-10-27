
mofron.effect.Blur = class extends mofron.effect.Base {
    effect (flg) {
        try {
            if (true === flg) {
                $(this.tgt_obj.getTarget()).velocity({blur : 2},this.speed);
            } else {
                $(this.tgt_obj.getTarget()).velocity({blur : 0},this.speed);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}

