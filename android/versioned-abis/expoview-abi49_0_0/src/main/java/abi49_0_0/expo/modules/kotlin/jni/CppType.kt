package abi49_0_0.expo.modules.kotlin.jni

import abi49_0_0.com.facebook.react.bridge.ReadableArray
import abi49_0_0.com.facebook.react.bridge.ReadableMap
import abi49_0_0.expo.modules.kotlin.typedarray.TypedArray
import kotlin.reflect.KClass

private var nextValue = 0

private fun nextValue(): Int = (1 shl nextValue).also { nextValue++ }

/**
 * Enum that represents Cpp types. Objects of those types can be obtained via JNI.
 */
enum class CppType(val clazz: KClass<*>, val value: Int = nextValue()) {
  NONE(Nothing::class, 0),
  DOUBLE(Double::class),
  INT(Int::class),
  LONG(Long::class),
  FLOAT(Float::class),
  BOOLEAN(Boolean::class),
  STRING(String::class),
  JS_OBJECT(JavaScriptObject::class),
  JS_VALUE(JavaScriptValue::class),
  READABLE_ARRAY(ReadableArray::class),
  READABLE_MAP(ReadableMap::class),
  TYPED_ARRAY(TypedArray::class),
  PRIMITIVE_ARRAY(Array::class),
  LIST(List::class),
  MAP(Map::class),
  VIEW_TAG(Int::class),
  SHARED_OBJECT_ID(Int::class),
  JS_FUNCTION(JavaScriptFunction::class)
}
