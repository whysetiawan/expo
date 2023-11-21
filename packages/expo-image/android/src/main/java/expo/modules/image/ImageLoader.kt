package expo.modules.image

import android.app.Activity
import com.bumptech.glide.Glide
import com.bumptech.glide.RequestManager
import expo.modules.kotlin.AppContext
import java.lang.ref.WeakReference

class ImageLoader {
  companion object {
  private var requestManager: RequestManager? = null
  private var appContextRef: WeakReference<AppContext?> = WeakReference(null)
  private var activityRef: WeakReference<Activity?> = WeakReference(null)

  fun getOrCreateRequestManager(
    appContext: AppContext,
    activity: Activity
  ): RequestManager = synchronized(this) {
    val cachedRequestManager = requestManager
      ?: return createNewRequestManager(activity).also {
        requestManager = it
        appContextRef = WeakReference(appContext)
        activityRef = WeakReference(activity)
      }

    // Request manager was created using different activity or app context
    if (appContextRef.get() != appContext || activityRef.get() != activity) {
      return createNewRequestManager(activity).also {
        requestManager = it
        appContextRef = WeakReference(appContext)
        activityRef = WeakReference(activity)
      }
    }

    return cachedRequestManager
  }

  private fun createNewRequestManager(activity: Activity): RequestManager = Glide.with(activity)
  }
}