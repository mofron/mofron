
mofron.effect.Shadow = class extends mofron.effect.Base {
    effect (flg) {
        try {
            if (true === flg) {
                $(this.tgt_obj.getTarget()).velocity(
                    { 
                        boxShadowX:    5 ,
                        boxShadowY:    5 ,
                        boxShadowBlur: 10 
                    } ,
                    this.speed
                );
            } else {
                $(this.tgt_obj.getTarget()).velocity(
                    {
                        boxShadowX:    0 ,
                        boxShadowY:    0 ,
                        boxShadowBlur: 0
                    } ,
                    this.speed
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}

