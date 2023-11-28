package expo.modules.kotlin.sharedobjects

import expo.modules.kotlin.AppContext
import expo.modules.kotlin.jni.JavaScriptObject



class ClassRegistry {

  internal var pairs = mutableMapOf<Any, JavaScriptObject>()

  internal fun add(native: Any, js: JavaScriptObject) {

    js.defineDeallocator {
      delete(native)
    }

    pairs[native] = js
  }

  internal fun delete(native: Any) {

  }

//  internal fun toNativeObject(id: ClassId): Any? {
//    return pairs[id]?.first
//  }

//  internal fun toNativeObject(js: JavaScriptObject): Any? {
//    if (!js.hasProperty(classIdPropertyName)) {
//      return null
//    }
//
//
//    val id = ClassId(js.getProperty(classIdPropertyName).getInt())
//    return pairs[id]?.first
//  }

  internal fun toJavaScriptObject(native: Any): JavaScriptObject? {
    return pairs[native]
  }
}
