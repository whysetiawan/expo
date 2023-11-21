// Copyright © 2021-present 650 Industries, Inc. (aka Expo)

#pragma once

#include "JNIDeallocator.h"

#include <fbjni/fbjni.h>
#include <folly/dynamic.h>

#include <react/jni/WritableNativeArray.h>
#include <react/jni/WritableNativeMap.h>
#include <fbjni/detail/CoreClasses.h>

namespace jni = facebook::jni;
namespace react = facebook::react;

namespace expo {

struct SharedObjectId : public jni::HybridClass<SharedObjectId> {
  static constexpr const char *kJavaDescriptor = "Lexpo/modules/kotlin/sharedobjects/SharedObjectId;";

  SharedObjectId();
//  SharedObjectId(folly::dynamic &&val);

  RN_EXPORT int value;

  static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject> jThis);

//   static void registerNatives();
  private:
    friend HybridBase;
};

struct SharedRef : public jni::HybridClass<SharedRef, SharedObjectId> {
  static constexpr const char *kJavaDescriptor = "Lexpo/modules/kotlin/sharedobjects/SharedRef;";



//  static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject> jThis);

  SharedRef();
//  SharedRef(folly::dynamic &&val);


  SharedObjectId sharedObjectId;

  static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject> jThis);
  static void registerNatives();

  private:
    friend HybridBase;

};

class JSIInteropModuleRegistry;

class JavaCallback : public jni::HybridClass<JavaCallback, Destructible> {
public:
  static auto constexpr
    kJavaDescriptor = "Lexpo/modules/kotlin/jni/JavaCallback;";
  static auto constexpr TAG = "JavaCallback";

  using Callback = std::function<void(folly::dynamic)>;

  static void registerNatives();

  static jni::local_ref<JavaCallback::javaobject> newInstance(
    JSIInteropModuleRegistry *jsiInteropModuleRegistry,
    Callback callback
  );

private:
  friend HybridBase;


  JavaCallback(Callback callback);

  void invoke();

  void invokeBool(bool result);

  void invokeInt(int result);

  void invokeDouble(double result);

  void invokeFloat(float result);

  void invokeString(jni::alias_ref<jstring> result);

  void invokeArray(jni::alias_ref<react::WritableNativeArray::javaobject> result);

  void invokeMap(jni::alias_ref<react::WritableNativeMap::javaobject> result);

  void invokeSharedRef(jni::alias_ref<SharedRef::javaobject> result);

  Callback callback;

};
} // namespace expo
