// Copyright © 2021-present 650 Industries, Inc. (aka Expo)

#include "JavaCallback.h"
#include "JSIInteropModuleRegistry.h"
#include <fbjni/fbjni.h>
#include <fbjni/fbjni.h>
#include <folly/dynamic.h>

namespace expo {



JavaCallback::JavaCallback(Callback callback)
  : callback(std::move(callback)) {}

JSIInteropModuleRegistry* JavaCallback::jsiRegistry_ = nullptr;



void JavaCallback::registerNatives() {
  registerHybrid({
                   makeNativeMethod("invoke", JavaCallback::invoke),
                   makeNativeMethod("invoke", JavaCallback::invokeBool),
                   makeNativeMethod("invoke", JavaCallback::invokeInt),
                   makeNativeMethod("invoke", JavaCallback::invokeDouble),
                   makeNativeMethod("invoke", JavaCallback::invokeFloat),
                   makeNativeMethod("invoke", JavaCallback::invokeString),
                   makeNativeMethod("invoke", JavaCallback::invokeArray),
                   makeNativeMethod("invoke", JavaCallback::invokeMap),
                   makeNativeMethod("invoke", JavaCallback::invokeSharedRef)
                 });
}

void SharedRef::registerNatives() {
  registerHybrid({
                   makeNativeMethod("initHybrid", SharedRef::initHybrid)
                 });
}

jni::local_ref<SharedRef::jhybriddata>
SharedRef::initHybrid(jni::alias_ref<jhybridobject> jThis) {
  return makeCxxInstance();
}

jni::local_ref<SharedRef::jhybriddata>
SharedObjectId::initHybrid(jni::alias_ref<jhybridobject> jThis) {
  return makeCxxInstance();
}

SharedRef::SharedRef() = default;

SharedObjectId::SharedObjectId() = default;

jni::local_ref<JavaCallback::javaobject> JavaCallback::newInstance(
  JSIInteropModuleRegistry *jsiInteropModuleRegistry,
  Callback callback
) {
  auto object = JavaCallback::newObjectCxxArgs(std::move(callback));
  jsiRegistry_ = jsiInteropModuleRegistry;
  jsiInteropModuleRegistry->jniDeallocator->addReference(object);
  return object;
}

void JavaCallback::invoke() {
  auto* callbackArg = new CallbackArg;
  callbackArg->type = CallbackArgType::DYNAMIC;
  auto dynObj = std::make_unique<folly::dynamic>(nullptr);
  callbackArg->type = CallbackArgType::DYNAMIC;
  callbackArg->arg.dynamicArg = dynObj.release();
  callback(callbackArg);
}

void JavaCallback::invokeBool(bool result) {
  auto* callbackArg = new CallbackArg;
  auto dynObj = std::make_unique<folly::dynamic>(result);
  callbackArg->type = CallbackArgType::DYNAMIC;
  callbackArg->arg.dynamicArg = dynObj.release();
  callback(callbackArg);
}

void JavaCallback::invokeInt(int result) {
  auto* callbackArg = new CallbackArg;
  auto dynObj = std::make_unique<folly::dynamic>(result);
  callbackArg->type = CallbackArgType::DYNAMIC;
  callbackArg->arg.dynamicArg = dynObj.release();
  callback(callbackArg);
}

void JavaCallback::invokeDouble(double result) {
  auto* callbackArg = new CallbackArg;
  auto dynObj = std::make_unique<folly::dynamic>(result);
  callbackArg->type = CallbackArgType::DYNAMIC;
  callbackArg->arg.dynamicArg = dynObj.release();
  callback(callbackArg);
}

void JavaCallback::invokeFloat(float result) {
  auto* callbackArg = new CallbackArg;
  auto dynObj = std::make_unique<folly::dynamic>(result);
  callbackArg->type = CallbackArgType::DYNAMIC;
  callbackArg->arg.dynamicArg = dynObj.release();
  callback(callbackArg);
}

void JavaCallback::invokeString(jni::alias_ref<jstring> result) {
  auto* callbackArg = new CallbackArg;
  auto dynObj = std::make_unique<folly::dynamic>(result->toStdString());
  callbackArg->type = CallbackArgType::DYNAMIC;
  callbackArg->arg.dynamicArg = dynObj.release();
  callback(callbackArg);
}

void JavaCallback::invokeArray(jni::alias_ref<react::WritableNativeArray::javaobject> result) {
  auto* callbackArg = new CallbackArg;
  auto dynObj = std::make_unique<folly::dynamic>(result->cthis()->consume());
  callbackArg->type = CallbackArgType::DYNAMIC;
  callbackArg->arg.dynamicArg = dynObj.release();
  callback(callbackArg);
}

void JavaCallback::invokeMap(jni::alias_ref<react::WritableNativeMap::javaobject> result) {
  auto* callbackArg = new CallbackArg;
  auto dynObj = std::make_unique<folly::dynamic>(result->cthis()->consume());
  callbackArg->type = CallbackArgType::DYNAMIC;
  callbackArg->arg.dynamicArg = dynObj.release();
  callback(callbackArg);
}

void JavaCallback::invokeSharedRef(jni::alias_ref<SharedRef::javaobject> result) {
  auto* callbackArg = new CallbackArg;

  callbackArg->type = CallbackArgType::SHARED_REF;

  // converting to strong ref
  auto strongRef = jni::make_global(result);
  auto strongRef2 = strongRef;
  callbackArg->arg.sharedRefArg = strongRef2;

  callback(callbackArg);


//  folly::dynamic myDynamicObject = folly::dynamic::object();
//
//  // Add keys and values to the dynamic object
//  myDynamicObject["value"] = result->cthis()->sharedObjectId.value;
//  myDynamicObject["type"] = "sharedRef";

//jsiRegistry_->createObject();
//  auto &rt = jsiRegistry_->runtimeHolder->get();
//  rt.evaluateJavaScript()
//  auto jsObject = std::make_shared<jsi::Object>(rt);
//  auto jsObjectRef = JavaScriptObject::newInstance(
//    jsiRegistry_,
//    jsiRegistry_->runtimeHolder,
//    jsObject
//  );
//  jsiRegistry_->registerSharedObject(jni::make_local(result),jsObjectRef);
//callback(myDynamicObject);
//  moduleRegistry->registerSharedObject(jni::make_local(unpackedValue), jsObjectRef);
//  callback(jsObjectRef->cthis());
}


} // namespace expo
