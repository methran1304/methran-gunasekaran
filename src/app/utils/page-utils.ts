import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class PageUtils {
    public ScrollToTop(): void {
        window.scroll(0, 0);
    }
}
