         ]   \        ��������Q<�mfb�>y�5<NКj�,͌            u
REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER)

.PHONY: test
