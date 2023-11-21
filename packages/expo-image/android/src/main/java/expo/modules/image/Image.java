package expo.modules.image;

import expo.modules.kotlin.sharedobjects.SharedRef;

public class Image extends SharedRef<android.media.Image> {
  public Image(android.media.Image ref) {
    super(ref);
  }
}
