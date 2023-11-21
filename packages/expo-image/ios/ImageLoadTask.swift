import expo.modules.core.interfaces.SharedObject
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

internal class ImageLoadTask(private val source: ImageSource) : SharedObject() {
    private var task: Task<UIImage?, Never>? = null

    suspend fun load(): UIImage? = suspendCoroutine { continuation ->
        if (task == null) {
            task = Task {
                ImageLoader.shared.load(source).also { result ->
                    continuation.resume(result)
                }
            }
        }
        continuation.resume(task?.value)
    }

    fun abort() {
        task?.cancel()
    }
}
