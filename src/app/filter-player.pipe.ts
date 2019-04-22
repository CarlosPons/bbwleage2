import { Pipe, PipeTransform } from '@angular/core';
import Player from './Player';

@Pipe({
    name: 'playeractivefilter',
    pure: false
})
export class FilterPlayerPipe implements PipeTransform {
    transform(items: Player[], filter: Player): Player[] {
        if (!items || !filter) {
          return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter((item: Player) => this.applyFilter(item, filter));
      }

      applyFilter(player: Player, filter: Player): boolean {
        if ( player.updated.length === 0 ) {
            return true;
        }
        return false;
      }
}
