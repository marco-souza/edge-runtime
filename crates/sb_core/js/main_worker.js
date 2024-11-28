import { core, primordials } from 'ext:core/mod.js';

import { MAIN_WORKER_API as ai } from 'ext:sb_ai/js/ai.js';
import { SUPABASE_USER_WORKERS } from 'ext:sb_user_workers/user_workers.js';
import { applySupabaseTag } from 'ext:sb_core_main_js/js/http.js';

const ops = core.ops;
const { ObjectDefineProperty } = primordials;

ObjectDefineProperty(globalThis, 'EdgeRuntime', {
	get() {
		return {
			ai,
			userWorkers: SUPABASE_USER_WORKERS,
			getRuntimeMetrics: () => /* async */ ops.op_runtime_metrics(),
			applySupabaseTag: (src, dest) => applySupabaseTag(src, dest),
			systemMemoryInfo: () => ops.op_system_memory_info(),
			raiseSegfault: () => ops.op_raise_segfault(),
		};
	},
	configurable: true,
});
